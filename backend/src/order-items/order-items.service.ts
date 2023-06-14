import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
  ) {}

  create(createOrderItemDto: CreateOrderItemDto) {
    const newOrderItem = this.orderItemsRepository.create(createOrderItemDto);
    return this.orderItemsRepository.save(newOrderItem);
  }

  findAll() {
    return this.orderItemsRepository.find({ relations: ['books', 'orders'] });
  }

  findOne(id: number) {
    return this.orderItemsRepository.findOneBy({ id });
  }

  async update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    const order = await this.findOne(id);
    return this.orderItemsRepository.save({ ...order, ...updateOrderItemDto });
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    return this.orderItemsRepository.remove(order);
  }
}
