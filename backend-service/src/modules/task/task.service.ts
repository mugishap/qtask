import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { AddFileDTO } from './dto/add-file.dto';

@Injectable()
export class TaskService {

    constructor(
        private prisma: PrismaService,
    ) { }

    async createTask(dto: CreateTaskDTO) {
        const task = await this.prisma.task.create({
            data: {
                name: dto.name,
                description: dto.description,
                startDate: dto.startDate,
                endDate: dto.endDate,
                priority: dto.priority,
                assignees: {
                    connect: dto.assigneesIds.map(id => ({ id }))
                },
                file: {
                    create: {
                        name: dto.file.name,
                        url: dto.file.url
                    }
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
                name: dto.name,
                description: dto.description,
                startDate: dto.startDate,
                endDate: dto.endDate
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
            skip: page * limit,
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
            skip: page * limit,
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
            skip: page * limit,
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
            skip: page * limit,
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
            skip: page * limit,
            take: Number(limit),
        })
        return tasks;
    }

    async removeFileFromTask(taskId: string) {
        const task = await this.prisma.task.update({
            where: { id: taskId },
            data: {
                file: {
                    disconnect: true
                }
            }
        })
        return task;
    }

    async addFileToTask(taskId: string, dto: AddFileDTO) {
        const task = await this.prisma.task.update({
            where: { id: taskId },
            data: {
                file: {
                    create: {
                        name: dto.name,
                        url: dto.url
                    }
                },
            },
            include: { file: true }
        })
        return task;
    }

    async addAssigneeToTask(taskId: string, assigneeId: string) {
        const task = await this.prisma.task.update({
            where: { id: taskId },
            data: {
                assignees: {
                    connect: { id: assigneeId }
                }
            }
        })
        return task;
    }

    async removeAssigneeFromTask(taskId: string, assigneeId: string) {
        const task = await this.prisma.task.update({
            where: { id: taskId },
            data: {
                assignees: {
                    disconnect: { id: assigneeId }
                }
            }
        })
        return task;
    }

    async searchTasks(search: string, page: number, limit: number) {
        const tasks = await this.prisma.task.findMany({
            where: {
                name: {
                    contains: search
                },
                description: {
                    contains: search
                }
            },
            include: {
                assignees: true,
                file: true,
            },
            skip: page * limit,
            take: Number(limit),
        })
        return tasks;
    }

}

