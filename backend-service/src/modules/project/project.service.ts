import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDTO } from './dto/create-project.dto';

@Injectable()
export class ProjectService {

    constructor(
        private prisma: PrismaService
    ) { }

    async createProject(dto: CreateProjectDTO) {
        const project = await this.prisma.project.create({
            data: {
                name: dto.name,
                description: dto.description,
                file: {
                    connect: {
                        id: dto.fileId
                    }
                }
            }
        })
        return project;
    }

}
