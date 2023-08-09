import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import appConfig from 'src/config/app.config';

@Module({
  imports: [
    JwtModule.register({
      secret: appConfig().jwt.secret,
      global: true,
      signOptions: { expiresIn: appConfig().jwt.expiresIn },
    }),
    UserModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
