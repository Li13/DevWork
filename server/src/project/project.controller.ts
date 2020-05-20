import {
  Controller,
  UseGuards,
  Get,
  Post,
  Put,
  Body,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProjectService } from './project.service';
import { Project } from './project.entity';

@UseGuards(JwtAuthGuard)
@Controller('demand')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

}
