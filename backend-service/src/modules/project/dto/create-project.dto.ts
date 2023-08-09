import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class CreateProjectDTO {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsEmpty()
    fileId: string;
}