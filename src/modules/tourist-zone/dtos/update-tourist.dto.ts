import { IsOptional, IsString } from "class-validator";

export class UpdateTouristZoneDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    location: string;

    @IsOptional()
    images?: Express.Multer.File[];
}
    