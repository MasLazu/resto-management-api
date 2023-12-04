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
    @InjectModel('Order') private readonly orderModel: mongoose.Model<Order>,
  ) {}

  async create(createOrder: CreateOrderDto, user: user): Promise<Order> {
    const order = {
      status: OrderStatus.ORDERED,
      waiter: {
        _id: user.sub,
        name: user.name,
      },
      ...createOrder,
    };
    return await this.orderModel.create(order);
  }

  async findOne(id: string): Promise<Order> {
    try {
      return await this.orderModel.findById(id);
    } catch {
      throw new Error('Order not found');
    }
  }

  async cook(id: string, user: user): Promise<Order> {
    const order = await this.findOne(id);
    if (!order) {
      throw new Error('Order not found');
    }

    if (order.status !== OrderStatus.ORDERED) {
      throw new Error('Order is not in status ORDERED');
    }

    order.status = OrderStatus.COOKED;
    order.chef = {
      _id: user.sub,
      name: user.name,
    };

    return await this.update(id, order);
  }

  async pay(id: string, user: user): Promise<Order> {
    const order = await this.findOne(id);
    if (!order) {
      throw new Error('Order not found');
    }

    if (order.status !== OrderStatus.COOKED) {
      throw new Error('Order is not in status COOCKED');
    }

    order.status = OrderStatus.PAID;
    order.chashier = {
      _id: user.sub,
      name: user.name,
    };

    return await this.update(id, order);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderModel.find();
  }

  async update(id: string, order: Order): Promise<Order> {
    const result = await this.orderModel.findByIdAndUpdate(id, order, {
      new: true,
      runValidators: true,
    });
    const { password, ...res } = result['_doc'];
    return res;
  }
}
