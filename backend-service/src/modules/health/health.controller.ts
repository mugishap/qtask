import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import ServerResponse from 'src/utils/ServerResponse';

@Controller('health')
@ApiBearerAuth()
@ApiTags('health')
export class HealthController {

    @Get("/")
    async health() {
        return ServerResponse.success("Server is up and running");
    }

}
