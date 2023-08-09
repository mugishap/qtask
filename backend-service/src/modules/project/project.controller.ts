import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateProjectDTO } from './dto/create-project.dto';
import { ProjectService } from './project.service';
import { UpdateProjectDTO } from './dto/update-project.dto';
import ServerResponse from 'src/utils/ServerResponse';

@Controller('project')
@ApiTags("projects")
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ProjectController {

    constructor(
        private projectService: ProjectService
    ) { }

    @Post("create")
    async createProject(@Body() dto: CreateProjectDTO) {
        const project = await this.projectService.createProject(dto)
        return ServerResponse.success("Project created successfuly", { project })
    }

    @Put("update")
    @ApiParam({ name: "id", required: true })
    async updateProject(@Param("id") id: string, @Body() dto: UpdateProjectDTO) {
        const project = await this.projectService.updateProject(id, dto)
        return ServerResponse.success("Project updated successfuly", { project })
    }

    @Get("get-all")
    async getAllProjects() {
        const projects = await this.projectService.getAllProjects()
        return ServerResponse.success("Projects fetched successfuly", { projects })
    }

    @Get("all")
    @ApiParam({ name: "page", required: false, type: Number })
    @ApiParam({ name: "limit", required: false, type: Number })
    async getProjectsPaginated(@Query("page") page: number, @Query("limit") limit: number) {
        const projects = await this.projectService.getProjects(page, limit)
        return ServerResponse.success("Projects fetched successfuly", { projects })
    }



}
