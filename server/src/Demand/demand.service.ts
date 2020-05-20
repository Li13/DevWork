import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Demand, QueryListOptions, QueryListResults } from './demand.entity';

@Injectable()
export class DemandService {
  constructor(
    @InjectRepository(Demand)
    private readonly demandRepository: Repository<Demand>,
  ) {}

  async add(data: Demand): Promise<Demand> {
    const demand = new Demand();
    demand.title = data.title;
    demand.desc = data.desc;
    demand.priority = data.priority;
    demand.type = data.type;
    demand.state = data.state;
    const res = await this.demandRepository.save(demand);
    return res;
  }

  async find(id: string): Promise<Demand> {
    const res = await this.demandRepository.findOne(id);
    return res;
  }

  async findList(query: QueryListOptions): Promise<QueryListResults> {
    const take = +query.pageSize || 10;
    const page = +query.page || 1;
    const skip = Math.floor(take * (page - 1));
    const [list, total] = await this.demandRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();
    return {
      list,
      total,
      page,
      pageCount: Math.ceil(total / take),
    };
  }

  async list(): Promise<any> {
    await this.demandRepository
      .createQueryBuilder('demand')
      .orderBy('demand.weight', 'DESC');
  }

  async edit(id: string): Promise<string> {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        message: '参数错误',
      },
      403,
    );
    // throw new HttpException({

    // })
    // throw new BadRequestException()
    return '123';
  }

  async addUser(): Promise<string> {
    return '添加成功';
  }
}
