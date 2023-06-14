import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { OrderItem } from 'src/order-items/entities/order-item.entity';

export enum OrderStatus {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User, (user) => user.id)
  user_id: User;

  @Column({
    default: OrderStatus.PENDING,
  })
  status: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.orders)
  orderItems: OrderItem[];
}
