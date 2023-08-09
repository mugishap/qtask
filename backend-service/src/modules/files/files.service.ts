import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FilesService {

    constructor(
        private prisma: PrismaService
    ) { }

    async getAllFiles(page: number, limit: number) {
        const files = await this.prisma.file.findMany({
            skip: page * limit,
            take: Number(limit)
        });
        return files;
    }
    async getFileById(id: string) {
        const file = await this.prisma.file.findUnique({
            where: {
                id
            }
        });
        return file;
    }

}
