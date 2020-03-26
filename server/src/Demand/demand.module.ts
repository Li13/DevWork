import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemandService } from './demand.service';
import { DemandController } from './demand.controller';
import { Demand } from './demand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Demand])],
  providers: [DemandService],
  controllers: [DemandController],
})
export class DemandModule {}
