import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Injectable()
export class TaskService {

    constructor(
        private prisma: PrismaService,
    ) { }

    async createTask(dto: CreateTaskDTO) {
        const task = await this.prisma.task.create({
            data: {
                title: dto.title,
                description: dto.description,
                startDate: dto.startDate,
                endDate: dto.endDate,
                priority: dto.priority,
                assignees: {
                    connect: dto.assigneesIds.map(id => ({ id }))
                },
                file: {
                    connect: { id: dto.fileId ?? null }
                },
                status: dto.status ?? "TODO",
            }
        })
        return task;
    }
    async updateTask(taskId: string, dto: UpdateTaskDTO) {
        const task = await this.prisma.task.update({
            where: { id: taskId },
            data: {
                title: dto.title,
                description: dto.description,
                startDate: dto.startDate,
                endDate: dto.endDate,
                assignees: {
                    connect: dto.assigneesIds.map(id => ({ id }))
                }
            }
        })
        return task;
    }

    async updateTaskStatus(taskId: string, status: "TODO" | "IN_PROGRESS" | "DONE") {
        const task = await this.prisma.task.update({
            where: { id: taskId },
            data: {
                status
            }
        })
        return task;
    }
    async updateTaskPriority(taskId: string, priority: "LOW" | "MEDIUM" | "HIGH") {
        const task = await this.prisma.task.update({
            where: { id: taskId },
            data: {
                priority
            }
        })
        return task;
    }
    async getTaskById(id: string) {
        const task = await this.prisma.task.findUnique({
            where: { id },
            include: {
                assignees: true,
                file: true,
            }
        })
        return task;
    }
    async getTasks(page: number, limit: number) {
        const tasks = await this.prisma.task.findMany({
            include: {
                assignees: true,
                file: true,
            },
            skip: (page - 1) * limit,
            take: Number(limit),
        })
        return tasks;
    }
    async deleteTask(id: string) {
        const task = await this.prisma.task.delete({
            where: { id }
        })
        return task;
    }
    async getTasksByAssigneeId(id: string, page: number, limit: number) {
        const tasks = await this.prisma.task.findMany({
            where: {
                assignees: {
                    some: {
                        id
                    }
                }
            },
            include: {
                assignees: true,
                file: true,
            },
            skip: (page - 1) * limit,
            take: Number(limit),
        })
        return tasks;
    }
    async getTasksByStatus(status: "DONE" | "IN_PROGRESS" | "TODO", page: number, limit: number) {
        const tasks = await this.prisma.task.findMany({
            where: {
                status
            },
            include: {
                assignees: true,
                file: true,
            },
            skip: (page - 1) * limit,
            take: Number(limit),
        })
        return tasks;
    }
    async getTasksByPriority(priority: "LOW" | "HIGH" | "MEDIUM", page: number, limit: number) {
        const tasks = await this.prisma.task.findMany({
            where: {
                priority
            },
            include: {
                assignees: true,
                file: true,
            },
            skip: (page - 1) * limit,
            take: Number(limit),
        })
        return tasks;
    }
    async getTasksByProjectId(id: string, page: number, limit: number) {
        const tasks = await this.prisma.task.findMany({
            where: {
                project: {
                    id
                }
            },
            include: {
                assignees: true,
                file: true,
            },
            skip: (page - 1) * limit,
            take: Number(limit),
        })
        return tasks;
    }

}

