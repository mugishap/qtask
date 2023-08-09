import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from '../user/user.service';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) { }

    async login(dto: LoginDTO) {
        const user = await this.userService.findByEmail(dto.email);
        if (!user) throw new UnauthorizedException("Invalid credentials")
        const isMatch = await compareSync(dto.password, user.password);
        if (!isMatch) throw new UnauthorizedException("Invalid credentials")
        const token = await this.jwtService.signAsync({ id: user.id });
        return { user, token }
    }
}
