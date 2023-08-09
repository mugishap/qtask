import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsEmpty, IsNotEmpty, IsString, IsUUID, Max, MaxLength } from "class-validator";

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
    @IsDate()
    @ApiProperty()
    startDate: Date;

    @IsNotEmpty()
    @IsDate()
    @ApiProperty()
    endDate: Date;

}