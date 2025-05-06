import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class CheckSizeFilePipe implements PipeTransform {
    constructor(private readonly limit: number) {}

    transform(file: Express.Multer.File) {
        if(!file) {
            throw new BadRequestException('No file provided');
        }
        if(file.size > this.limit) {
            throw new BadRequestException('File size is too large');
        }
        return file;
    }
}