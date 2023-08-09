import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { FilesService } from './files.service';
import ServerResponse from 'src/utils/ServerResponse';

@Controller('files')
@ApiTags("files")
export class FilesController {

    constructor(
        private filesService: FilesService
    ) { }

    @Get("/all")
    @ApiQuery({ name: "page", required: false, example: 0, type: Number })
    @ApiQuery({ name: "limit", required: false, example: 5, type: Number })
    async getAllFiles(
        @Query("page") page: number = 0,
        @Query("limit") limit: number = 5
    ) {
        const files = await this.filesService.getAllFiles(page, limit);
        return ServerResponse.success("Files fetched successfully", { files });
    }

    @Get("/get/:fileId")
    async getFileById(@Param("fileId") id: string) {
        const file = await this.filesService.getFileById(id);
        return ServerResponse.success("File fetched successfully", { file });
    }

}
