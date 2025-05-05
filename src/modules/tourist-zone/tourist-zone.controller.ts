import { Body, Controller, Get, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { TouristZoneService } from "./tourist-zone.service";
import { CreateTouristZoneDto } from "./dtos";
import { FilesInterceptor } from "@nestjs/platform-express";

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
    @UploadedFiles() images: Express.Multer.File[]
) {
    return await this.service.create(payload, images);
}

}