import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Demand } from './model';

@Injectable()
export class DemandService {
  constructor(
    @InjectRepository(Demand)
    private readonly demandRepository: Repository<Demand>,
  ) {}

  async add(data: Demand): Promise<string> {
    const demand = new Demand();
    demand.title = data.title;
    demand.desc = data.desc;
    demand.weight = data.weight;
    const res = await this.demandRepository.save(demand);
    return 'Hello World!';
  }

  async find(id: string): Promise<Demand> {
    const res = await this.demandRepository.findOne(id);
    return res
  }
}
