import { Controller, UseGuards, Get, Post, Body, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DemandService } from './service';
import { Demand } from './model';

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
}
