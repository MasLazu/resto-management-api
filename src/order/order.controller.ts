import {
  Get,
  Post,
  Body,
  Param,
  Put,
  Req,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UseGuards } from '@nestjs/common';
import { WaiterGuard } from 'src/guards/waiter.guard';
import type { user } from 'src/types/userJwt';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(WaiterGuard)
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @Req() { user }: { user: user },
  ) {
    try {
      return this.orderService.create(createOrderDto, user);
    } catch {
      throw new InternalServerErrorException('Error creating order!');
    }
  }

  @Get()
  async findAll() {
    try {
      return this.orderService.findAll();
    } catch {
      throw new InternalServerErrorException('Error getting orders!');
    }
  }
}
