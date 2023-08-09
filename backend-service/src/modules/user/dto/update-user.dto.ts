import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UpdateUserDTO {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @ApiProperty()
    readonly firstName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @ApiProperty()
    readonly lastName: string;

    @IsEmail()
    @ApiProperty()
    readonly email: string;

    @IsNotEmpty()
    @Matches(/^\+250\d{9}$/, {
        message: 'Mobile number must start with "+250" and have 9 digits after that.',
    })
    @ApiProperty()
    readonly telephone: string;

}