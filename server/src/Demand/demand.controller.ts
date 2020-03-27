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
import { DemandService } from './demand.service';
import { Demand } from './demand.entity';

@UseGuards(JwtAuthGuard)
@Controller('demand')
export class DemandController {
  constructor(private readonly demandService: DemandService) {}

  @Post('add')
  async save(@Body() demand: Demand): Promise<string> {
    return this.demandService.add(demand);
  }

  @Get()
  async find(@Query('id') id: string): Promise<Demand> {
    return this.demandService.find(id);
  }

  @Put()
  async edit(@Body('id') id: string): Promise<string> {
    return this.demandService.edit(id);
  }
}
