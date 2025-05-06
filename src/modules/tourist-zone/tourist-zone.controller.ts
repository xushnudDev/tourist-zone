import { Body, Controller, Get, Post, Put, UploadedFiles, UseInterceptors,Param, Delete } from "@nestjs/common";
import { TouristZoneService } from "./tourist-zone.service";
import { CreateTouristZoneDto, UpdateTouristZoneDto } from "./dtos";
import { FilesInterceptor } from "@nestjs/platform-express";
import { CheckSizeFilePipe } from "../pipes/check-size.pipe";
import { ParseIntCustomPipe } from "../pipes/parse-init.pipe";

@Controller("zones")
export class TouristZoneController {
    constructor(private service: TouristZoneService) {}

    @Get()
    async getAllZones() {
        return await this.service.getAllTouristZones();
    }

    @Post()
    @UseInterceptors(FilesInterceptor("images"))
    async createZone(
    @Body() payload: CreateTouristZoneDto,
    @UploadedFiles(new CheckSizeFilePipe(3 * 1024 * 1024)) images: Express.Multer.File[]
) {
    return await this.service.create(payload, images);
}

    @Put(":id")
    @UseInterceptors(FilesInterceptor("images"))
    async updateZone(@Body() payload: UpdateTouristZoneDto, @UploadedFiles(new CheckSizeFilePipe(3 * 1024 * 1024)) images: Express.Multer.File[], @Param("id") id: number) {
        return await this.service.update(id, {...payload}, images);
    }

    @Delete(":id")
    async deleteZone(@Param("id",ParseIntCustomPipe) id: number) {
        return await this.service.delete(id);
    }

}