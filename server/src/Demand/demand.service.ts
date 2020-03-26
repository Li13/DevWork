import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Demand } from './demand.entity';

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
    return res;
  }

  async edit(id: string): Promise<string> {
    throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      message: '参数错误',
    }, 403);
    // throw new HttpException({

    // })
    // throw new BadRequestException()
    return '123';
  }
}
