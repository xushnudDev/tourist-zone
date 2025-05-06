import {  Injectable, NotFoundException, OnModuleInit } from "@nestjs/common";
import { PostgresService } from "src/configs";
import { TouristZoneTable } from "./models";
import { CreateTouristZoneDto, UpdateTouristZoneDto } from "./dtos";
import { FsHelper } from "src/helpers";

@Injectable()
export class  TouristZoneService implements OnModuleInit {
    constructor(private pg: PostgresService,private fsHelper: FsHelper) {}

    async onModuleInit() {
        try {
            await this.pg.query(TouristZoneTable);
            console.log("Tourist Zone table created");
        } catch (error) {
            console.log("Error creating Tourist Zone table");
        }
    }

    async getAllTouristZones() {
        const touristZones = await this.pg.query("select * from tourist_zones");
        return {
            message: "Tourist Zones fetched successfully",
            count: touristZones.length,
            data: touristZones,
        }
    };

    async create(payload: CreateTouristZoneDto, images: Express.Multer.File[]) {
        let imagePaths: string[] = [];
    
        for (let image of images) {
            const img = await this.fsHelper.uploadFile(image);
            imagePaths.push(img.fileName.split("/").pop() as string);
        }
    
        const touristZones = await this.pg.query(
            `INSERT INTO tourist_zones (name, location, description, images) 
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [payload.name, payload.location, payload.description, imagePaths]
        );
    
        return {
            message: "Tourist Zone created successfully",
            data: touristZones,
        };
    }
    async update(id:number,payload: UpdateTouristZoneDto,images?:Express.Multer.File[]) {
        let imagePaths: string[] = [];
        if (images) {
            for (let image of images) {
                const img = await this.fsHelper.uploadFile(image);
                imagePaths.push(img.fileName.split("/").pop() as string);
            }
            await this.pg.query(
                `UPDATE tourist_zones SET name = $1, location = $2, description = $3, images = $4 WHERE id = $5 RETURNING *`,
                [payload.name, payload.location, payload.description, imagePaths, id]
            );
        } else {
            await this.pg.query(
                `UPDATE tourist_zones SET name = $1, location = $2, description = $3 WHERE id = $4 RETURNING *`,
                [payload.name, payload.location, payload.description, id]
            );
        }
        return {
            message: "Tourist Zone updated successfully",
            data: payload,
        };
    }   
    async delete(id: number) {
        const founded = await this.pg.query("SELECT * FROM tourist_zones WHERE id = $1", [id]);
        if(!founded.length) {
            throw new NotFoundException("Tourist Zone not found");
        }
        let imageUrls : string[] = [];
        if(founded[0].images) {
            if (typeof founded[0].images == "string") {
                imageUrls = JSON.parse(founded[0].images);
            } else {
                imageUrls = founded[0].images;
            }
            for (let imageUrl of imageUrls) {
                await this.fsHelper.deleteFile(imageUrl);
            }
        }
        const deleted = await this.pg.query("DELETE FROM tourist_zones WHERE id = $1 RETURNING *", [id]);
        return {
            message: "Tourist Zone deleted successfully",
            data: deleted[0],
        };
    }
}