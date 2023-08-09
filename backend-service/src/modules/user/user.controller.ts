import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthRequest } from 'src/types';
import ServerResponse from 'src/utils/ServerResponse';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('users')
@ApiBearerAuth()
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post("create")
    async create(@Body() dto: CreateUserDTO) {
        const response = await this.userService.create(dto);
        return ServerResponse.success("User created successfully", { user: response });
    }

    @Put("update")
    @UseGuards(AuthGuard)
    async update(@Req() request: AuthRequest, @Body() dto: UpdateUserDTO) {
        const response = await this.userService.update(request.user.id, dto);
        return ServerResponse.success("User updated successfully", { user: response });
    }

    @Get("view/:id")
    @UseGuards(AuthGuard)
    @ApiParam({ name: "id", required: true })
    async findOne(@Param("id") id: string) {
        const response = await this.userService.findOne(id);
        return ServerResponse.success("User fetched successfully", { user: response });
    }
    @Get("me")
    @UseGuards(AuthGuard)
    async me(@Req() request: AuthRequest) {
        const response = await this.userService.me(request.user.id);
        return ServerResponse.success("User fetched successfully", { user: response });
    }

    @Get("all")
    @UseGuards(AuthGuard)
    @ApiQuery({ name: "page", required: false, example: 0, type: Number })
    @ApiQuery({ name: "limit", required: false, example: 5, type: Number })
    async all(
        @Query("page")
        page: number = 0,
        @Query("limit")
        limit: number = 5
    ) {
        const response = await this.userService.findAll(page, limit);
        return ServerResponse.success("Users fetched successfully", { users: response });
    }

    @Get("/search")
    @UseGuards(AuthGuard)
    @ApiQuery({ name: "q", required: true })
    @ApiQuery({ name: "page", required: false, example: 0, type: Number })
    @ApiQuery({ name: "limit", required: false, example: 5, type: Number })
    async search(
        @Query("q") q: string,
        @Query("page") page: number = 0,
        @Query("limit") limit: number = 5) {
        const response = await this.userService.search(q, page, limit);
        return ServerResponse.success("Users fetched successfully", { users: response });
    }

    @Delete("delete")
    @UseGuards(AuthGuard)
    async delete(@Req() request: AuthRequest) {
        const response = await this.userService.delete(request.user.id);
        return ServerResponse.success("User deleted successfully", { user: response });
    }

}
