import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Order } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './schemas/order.schema';
import type { user } from 'src/types/userJwt';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly morderModel: mongoose.Model<Order>,
  ) {}

  async create(createOrder: CreateOrderDto, user: user): Promise<Order> {
    const order = {
      status: OrderStatus.ORDERED,
      waiter: {
        id: user.sub,
        name: user.name,
      },
      ...createOrder,
    };
    return await this.morderModel.create(order);
  }

  async findAll(): Promise<Order[]> {
    return await this.morderModel.find();
  }
}
