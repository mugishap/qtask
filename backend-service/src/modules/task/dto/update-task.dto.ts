import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsEmpty, IsNotEmpty, IsString, IsUUID, Max, MaxLength } from "class-validator";
import { FileDTO } from "./file.dto";

export class UpdateTaskDTO {

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty()
    name: string;

    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    @ApiProperty()
    description: string;

    @IsNotEmpty()
    @ApiProperty()
    startDate: Date;

    @IsNotEmpty()
    @ApiProperty()
    endDate: Date;

    @IsArray()
    @ApiProperty()
    assigneesIds: string[];

    @IsUUID()
    @IsNotEmpty({ message: "Project is required" })
    projectId: string;

    @ApiProperty()
    file: FileDTO

}