import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class CreateTouristZoneDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsOptional()
    images?: Express.Multer.File[];  
}
