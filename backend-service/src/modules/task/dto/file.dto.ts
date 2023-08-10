import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUrl } from "class-validator";

export class FileDTO {
    @ApiProperty()
    @IsNotEmpty({ message: 'Name should not be empty' })
    name: string;
  
    @ApiProperty()
    @IsNotEmpty({ message: 'URL should not be empty' })
    @IsUrl({}, { message: 'URL is not valid' })
    url: string;
  }