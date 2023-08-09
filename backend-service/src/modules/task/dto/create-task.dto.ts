import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsEmpty, IsEnum, IsNotEmpty, IsString, IsUUID, Max, MaxLength } from "class-validator";

export class CreateTaskDTO {

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

    @IsEnum(["TODO", "IN_PROGRESS", "DONE"])
    @ApiProperty()
    status: "TODO" | "IN_PROGRESS" | "DONE";

    @IsNotEmpty()
    @IsDate()
    @ApiProperty()
    startDate: Date;


    @IsNotEmpty()
    @IsDate()
    @ApiProperty()
    endDate: Date;

    @IsEnum(["LOW", "MEDIUM", "HIGH"])
    @IsNotEmpty()
    @ApiProperty()
    priority: "LOW" | "MEDIUM" | "HIGH";

    @IsArray()
    @ApiProperty()
    assigneesIds: string[];

    @ApiProperty()
    file: {
        name: string;
        url: string;
    };
}