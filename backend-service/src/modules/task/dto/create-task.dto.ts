import { IsArray, IsDate, IsEmpty, IsEnum, IsNotEmpty, IsString, IsUUID, Max, MaxLength } from "class-validator";

export class CreateTaskDTO {

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    title: string;

    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    description: string;

    @IsEnum(["TODO", "IN_PROGRESS", "DONE"])
    status: "TODO" | "IN_PROGRESS" | "DONE";

    @IsNotEmpty()
    @IsDate()
    startDate: Date;


    @IsNotEmpty()
    @IsDate()
    endDate: Date;

    @IsEnum(["LOW", "MEDIUM", "HIGH"])
    @IsNotEmpty()
    priority: "LOW" | "MEDIUM" | "HIGH";

    @IsArray()
    assigneesIds: string[];

    @IsString()
    @IsEmpty()
    @IsUUID()
    fileId: string;
}