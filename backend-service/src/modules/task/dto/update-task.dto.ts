import { IsArray, IsDate, IsEmpty, IsNotEmpty, IsString, IsUUID, Max, MaxLength } from "class-validator";

export class UpdateTaskDTO {

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    title: string;

    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsDate()
    startDate: Date;

    @IsNotEmpty()
    @IsDate()
    endDate: Date;

}