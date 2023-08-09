import { Controller, Get } from '@nestjs/common';
import { StatsService } from './stats.service';
import ServerResponse from 'src/utils/ServerResponse';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('stats')
@ApiTags("stats")
@ApiBearerAuth()
export class StatsController {

    constructor(private statsService: StatsService) { }

    @Get("/")
    async getStats() {
        const response = await this.statsService.getStats()
        return ServerResponse.success("Stats fetched sucessfully", response)
    }

}
