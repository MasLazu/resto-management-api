import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Order } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly morderModel: mongoose.Model<Order>,
  ) {}

  async create(order: CreateOrderDto): Promise<Order> {
    return await this.morderModel.create(order);
  }
}
