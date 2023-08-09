import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import ServerResponse from 'src/utils/ServerResponse';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
@ApiTags('auth')
@ApiBearerAuth()
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post("login")
    async login(@Body() dto: LoginDTO) {
        const response = await this.authService.login(dto);
        return ServerResponse.success("Login successful", { ...response });
    }

}
