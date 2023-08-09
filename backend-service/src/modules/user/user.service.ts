import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import ServerResponse from 'src/utils/ServerResponse';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {

    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async create(dto: CreateUserDTO) {
        try {
            const hashedPassword = await hash(dto.password, 10);
            const user = await this.prisma.user.create({
                data: {
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    email: dto.email,
                    telephone: dto.telephone,
                    password: hashedPassword,
                }
            })

            return user;
        }
        catch (error) {
            if (error.code === 'P2002') {
                const key = error.meta.target[0]
                throw new HttpException(`${key.charAt(0).toUpperCase() + key.slice(1)} (${dto[key]}) already exists`, 400);
            }
            throw error
        }
    }

    async update(userId: string, dto: UpdateUserDTO) {
        try {
            const user = await this.prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    telephone: dto.telephone,
                    email: dto.email,
                    updatedAt: new Date()
                },

            })

            const _user = await this.prisma.user.findUnique({ where: { id: user.id } })
            return _user
        }
        catch (error) {
            if (error.code === 'P2002') {
                const key = error.meta.target[0]
                return ServerResponse.error(`${key.charAt(0).toUpperCase() + key.slice(1)} (${dto[key]}) already exists`, error);
            }
            throw error
        }
    }

    async me(userId: string) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: userId
                }
            })
            return user
        }
        catch (error) {
            throw error
        }
    }

    async findAll(page: number, limit: number) {
        try {
            const users = await this.prisma.user.findMany({
                skip: page * limit,
                take: Number(limit)
            })
            return users
        }
        catch (error) {
            throw error
        }
    }

    async findByEmail(email: string) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email
                }
            })
            return user
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }

    async search(query: string, page: number, limit: number) {
        try {
            const users = await this.prisma.user.findMany({
                where: {
                    OR: [
                        {
                            firstName: {
                                contains: query
                            }
                        },
                        {
                            lastName: {
                                contains: query
                            }
                        },
                        {
                            email: {
                                contains: query
                            }
                        },
                        {
                            telephone: {
                                contains: query
                            }
                        }
                    ]
                },
                skip: page * limit,
                take: Number(limit)

            })
            return users;
        }
        catch (error) {
            throw error
        }
    }

    async delete(userId: string) {
        try {
            const user = await this.prisma.user.delete({
                where: {
                    id: userId
                },
            })
            return user
        }
        catch (error) {
            throw error
        }
    }

    async findOne(userId: string) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: userId
                }
            })
            if (user == null) throw new NotFoundException("User not found")
            return user
        }
        catch (error) {
            throw error
        }
    }

}
