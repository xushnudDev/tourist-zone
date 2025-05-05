import { Injectable, OnModuleInit } from "@nestjs/common";
import { PostgresService } from "src/configs";
import { TouristZoneTable } from "./models";
import { CreateTouristZoneDto } from "./dtos";
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
    
    
}