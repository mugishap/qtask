import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization;
        if (token && token.startsWith("Bearer ")) {
            const tokenValue = token.split(" ")[1];
            try {
                const decodedToken = this.jwtService.verify(tokenValue);
                const user = await this.prisma.user.findUnique({ where: { id: decodedToken.id } })
                if (!user) return false;
                request.user = decodedToken;
                return true;
            } catch (error) {
                console.log("Error: ", error.message)
                return false;
            }
        }
    }

    protected getRequest<T>(context: ExecutionContext): T {
        return context.switchToHttp().getRequest();
    }

    protected getToken(request: {
        headers: Record<string, string | string[]>;
    }): string {
        const authorization = request.headers['authorization'];
        if (!authorization || Array.isArray(authorization)) {
            throw new Error('Invalid Authorization Header');
        }
        const [_, token] = authorization.split(' ');
        return token;
    }
}