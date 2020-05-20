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
import { Demand, QueryListOptions, QueryListResults } from './demand.entity';

@UseGuards(JwtAuthGuard)
@Controller('demand')
export class DemandController {
  constructor(private readonly demandService: DemandService) {}

  @Post()
  async save(@Body() demand: Demand): Promise<Demand> {
    return this.demandService.add(demand);
  }

  @Get()
  async find(@Query('id') id: string): Promise<Demand> {
    return this.demandService.find(id);
  }

  @Get('list')
  async findList(@Query() query: QueryListOptions): Promise<QueryListResults> {
    return this.demandService.findList(query);
  }

  @Put()
  async edit(@Body('id') id: string): Promise<string> {
    return this.demandService.edit(id);
  }
}
