import { BadRequestException, Injectable, NotAcceptableException, PipeTransform } from "@nestjs/common";

@Injectable()
export class CheckFileMimeTypePipe implements PipeTransform {
    constructor(private readonly allowedMimeTypes: string[]) {}

    transform(file: Express.Multer.File) {
        if(!file) {
            throw new BadRequestException("No file provided");
        }
        console.log(file);
        
        if(!this.allowedMimeTypes.includes(file.mimetype)) {
            throw new NotAcceptableException("File type is not allowed");
        }
        return file;
    }

}