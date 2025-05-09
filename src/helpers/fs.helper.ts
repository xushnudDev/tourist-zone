import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import * as fsPromises from "fs/promises";

@Injectable()
export class FsHelper {
    async uploadFile(file:Express.Multer.File) {
        const fileFolder = path.join(process.cwd(), "uploads");

        if(!fs.existsSync(fileFolder)) {
            fs.mkdirSync(fileFolder, {recursive: true});
        };

        let fileName = `${Date.now()}-image.${file.originalname.split(".")[1]}`;
        await fsPromises.writeFile(path.join(fileFolder,fileName),file.buffer);

        return {
            message: "File uploaded successfully",
            fileName: path.join(fileFolder,fileName)
        }
    }
    async deleteFile(fileName: string) {
        const fileFolder = path.join(process.cwd(),"uploads",fileName);
        console.log(fileFolder);
        try {
            if(fs.existsSync(fileFolder)) {
                await fsPromises.unlink(fileFolder);
            } else {
                throw new Error("File does not exist");
            }
        } catch (error) {
            console.log("Error deleting file");
            
        }
    }
};