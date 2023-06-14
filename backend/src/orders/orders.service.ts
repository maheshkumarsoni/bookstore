import { Inject, Injectable, Request } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderStatus } from './entities/order.entity';

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

  async create(createOrderDto: CreateOrderDto) {
    const order = await this.ordersRepository.findOne({
      where: { status: OrderStatus.PENDING, user: createOrderDto.user },
    });
    if (!order?.id) {
      const newOrder = this.ordersRepository.create(createOrderDto);
      return this.ordersRepository.save(newOrder);
    }
    return 'Cart Already available!';
  }

  findAll() {
    return this.ordersRepository.find({
      relations: ['orderItems', 'user'],
      where: { user: { id: this.request.user.sub } },
    });
  }

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
