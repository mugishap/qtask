import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class UpdateProjectDTO {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

}