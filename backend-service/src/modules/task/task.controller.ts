import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateTaskDTO } from './dto/create-task.dto';
import ServerResponse from 'src/utils/ServerResponse';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { AddFileDTO } from './dto/add-file.dto';
import { AuthRequest } from 'src/types';

@Controller('task')
@ApiTags("tasks")
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class TaskController {

    constructor(
        private taskService: TaskService,
    ) { }

    @Post("create")
    async createTask(@Body() dto: CreateTaskDTO) {
        const task = await this.taskService.createTask(dto);
        return ServerResponse.success("Task created successfully", { task });
    }

    @Put("update/:taskId")
    @ApiParam({ name: "taskId", type: String })
    async updateTask(@Param("taskId") id: string, @Body() dto: UpdateTaskDTO) {
        const task = await this.taskService.updateTask(id, dto);
        return ServerResponse.success("Task updated successfully", { task });
    }

    @Patch("update-status/:taskId/:status")
    @ApiParam({ name: "taskId", type: String })
    @ApiParam({ name: "status", type: String })
    async updateTaskStatus(@Param("taskId") id: string, @Param("status") status: "TODO" | "IN_PROGRESS" | "DONE") {
        const task = await this.taskService.updateTaskStatus(id, status);
        return ServerResponse.success("Task status updated successfully", { task });
    }

    @Patch("update-priority/:taskId/:priority")
    @ApiParam({ name: "taskId", type: String })
    @ApiParam({ name: "priority", type: String })
    async updateTaskPriority(@Param("taskId") id: string, @Param("priority") priority: "LOW" | "MEDIUM" | "HIGH") {
        const task = await this.taskService.updateTaskPriority(id, priority);
        return ServerResponse.success("Task priority updated successfully", { task });
    }

    @Get("get-all")
    @ApiQuery({ name: "page", required: false, example: 0, type: Number })
    @ApiQuery({ name: "limit", required: false, example: 5, type: Number })
    async getAllTasks(@Query("page") page: number = 0,
        @Query("limit") limit: number = 5) {
        const tasks = await this.taskService.getTasks(page, limit);
        return ServerResponse.success("Tasks fetched successfully", { tasks });
    }

    @Get("get-by-user-and-status/:status")
    @ApiParam({ name: "status", type: String })
    async getTasksByUserAndStatus(@Req() request: AuthRequest, @Param("status") status: "TODO" | "IN_PROGRESS" | "DONE") {
        const tasks = await this.taskService.getTasksByUserAndStatus(request.user.id, status);
        return ServerResponse.success("Tasks fetched successfully", { tasks });
    }

    @Get("get/:taskId")
    @ApiParam({ name: "taskId", type: String })
    async getTask(@Param("taskId") id: string) {
        const task = await this.taskService.getTaskById(id);
        return ServerResponse.success("Task fetched successfully", { task });
    }

    @Get("get-by-assignee/:userId")
    @ApiParam({ name: "userId", type: String })
    @ApiQuery({ name: "page", required: false, example: 0, type: Number })
    @ApiQuery({ name: "limit", required: false, example: 5, type: Number })
    async getTasksByAssignee(@Param("userId") userId: string, @Query("page") page: number = 0,
        @Query("limit") limit: number = 5) {
        const tasks = await this.taskService.getTasksByAssigneeId(userId, page, limit);
        return ServerResponse.success("Tasks fetched successfully", { tasks });
    }

    @Delete("delete/:taskId")
    @ApiParam({ name: "taskId", type: String })
    async deleteTask(@Param("taskId") id: string) {
        const task = await this.taskService.deleteTask(id);
        return ServerResponse.success("Task deleted successfully", { task });
    }

    @Get("get-by-project/:projectId")
    @ApiParam({ name: "projectId", type: String })
    @ApiQuery({ name: "page", required: false, example: 0, type: Number })
    @ApiQuery({ name: "limit", required: false, example: 5, type: Number })
    async getTasksByProject(
        @Param("projectId") projectId: string,
        @Query("page") page: number = 0,
        @Query("limit") limit: number = 5
    ) {
        const tasks = await this.taskService.getTasksByProjectId(projectId, page, limit);
        return ServerResponse.success("Tasks fetched successfully", { tasks });
    }



    @Get("get-by-status/:status")
    @ApiParam({ name: "status", type: String })
    @ApiQuery({ name: "page", required: false, example: 0, type: Number })
    @ApiQuery({ name: "limit", required: false, example: 5, type: Number })
    async getTasksByStatus(
        @Param("status") status: "DONE" | "IN_PROGRESS" | "TODO",
        @Query("page") page: number = 0,
        @Query("limit") limit: number = 5
    ) {
        const tasks = await this.taskService.getTasksByStatus(status, page, limit);
        return ServerResponse.success("Tasks fetched successfully", { tasks });
    }

    @Get("get-by-priority/:priority")
    @ApiParam({ name: "priority", type: String })
    @ApiQuery({ name: "page", required: false, example: 0, type: Number })
    @ApiQuery({ name: "limit", required: false, example: 5, type: Number })
    async getTasksByPriority(
        @Param("priority") priority: "LOW" | "MEDIUM" | "HIGH",
        @Query("page") page: number = 0,
        @Query("limit") limit: number = 5
    ) {
        const tasks = await this.taskService.getTasksByPriority(priority, page, limit);
        return ServerResponse.success("Tasks fetched successfully", { tasks });
    }

    @Get("get-by-search/:search")
    @ApiParam({ name: "search", type: String })
    @ApiQuery({ name: "page", required: false, example: 0, type: Number })
    @ApiQuery({ name: "limit", required: false, example: 5, type: Number })
    async searchTasks(
        @Param("search") search: string,
        @Query("page") page: number = 0,
        @Query("limit") limit: number = 5
    ) {
        const tasks = await this.taskService.searchTasks(search, page, limit);
        return ServerResponse.success("Tasks fetched successfully", { tasks });
    }

}

