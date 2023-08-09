import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('project')
@ApiTags("project")
export class ProjectController { }
