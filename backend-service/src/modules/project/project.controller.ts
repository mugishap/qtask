import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('project')
@ApiTags("project")
@UseGuards(AuthGuard)
export class ProjectController { }
