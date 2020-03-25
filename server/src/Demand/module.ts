import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemandService } from './service';
import { DemandController } from './controller';
import { Demand } from './model';

@Module({
  imports: [TypeOrmModule.forFeature([Demand])],
  providers: [DemandService],
  controllers: [DemandController],
})
export class DemandModule {}
