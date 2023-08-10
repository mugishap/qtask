import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDTO } from './dto/create-project.dto';
import { UpdateProjectDTO } from './dto/update-project.dto';

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
            }
        })
        return project;
    }

    async updateProject(id: string, dto: UpdateProjectDTO) {
        const project = await this.prisma.project.update({
            where: { id },
            data: {
                name: dto.name,
                description: dto.description,
            }
        })
        return project;
    }

    async getProjects(page: number, limit: number) {
        const projects = await this.prisma.project.findMany({
            skip: page * limit,
            take: Number(limit)
        })
        return projects;
    }

    async getAllProjects() {
        const projects = await this.prisma.project.findMany({})
        return projects;
    }

    async searchProjects(search: string, page: number, limit: number) {
        const projects = await this.prisma.project.findMany({
            where: {
                name: {
                    contains: search
                }
            },
            skip: page * limit,
            take: Number(limit)
        })
        return projects;
    }

}
