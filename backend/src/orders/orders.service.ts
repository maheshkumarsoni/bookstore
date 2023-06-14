import { Inject, Injectable, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { REQUEST } from '@nestjs/core';

type UserFromToken = {
  sub: number;
  email: string;
};

export interface IGetUserAuthInfoRequest extends Request {
  user: UserFromToken;
}

@Injectable()
export class OrdersService {
  constructor(
    @Inject(REQUEST) private readonly request: IGetUserAuthInfoRequest,
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    const newOrder = this.ordersRepository.create(createOrderDto);
    return this.ordersRepository.save(newOrder);
  }

  findAll() {
    return this.ordersRepository.find();
  }
  // async findAll(page: number, limit: number) {
  //   const skip = (page - 1) * limit;

  //   const [result, total] = await this.ordersRepository.findAndCount({
  //     relations: ['tags'],
  //     skip,
  //     take: limit,
  //   });
  //   return { result, total };
  // }

  findOne(id: number) {
    return this.ordersRepository.findOneBy({ id });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);
    return this.ordersRepository.save({ ...order, ...updateOrderDto });
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    return this.ordersRepository.remove(order);
  }
}
