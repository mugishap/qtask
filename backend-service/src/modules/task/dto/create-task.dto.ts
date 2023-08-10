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

    @IsNotEmpty()
    @ApiProperty()
    startDate: Date;

    @IsNotEmpty()
    @ApiProperty()
    endDate: Date;

    @IsEnum(["LOW", "MEDIUM", "HIGH"])
    @IsNotEmpty()
    @ApiProperty()
    priority: "LOW" | "MEDIUM" | "HIGH";

    @IsArray()
    @ApiProperty()
    assigneesIds: string[];

    @IsUUID()
    @IsNotEmpty({ message: "Project is required" })
    projectId: string;

    @ApiProperty()
    file: {
        name: string;
        url: string;
    };
}