import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatsService {

    constructor(private prisma: PrismaService) { }

    async getStats() {
        const projects = await this.prisma.project.count();
        const tasks = await this.prisma.task.count();
        const users = await this.prisma.user.count();
        return {
            users,
            tasks,
            projects
        }
    }

}
