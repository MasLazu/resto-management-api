import {
  Get,
  Post,
  Body,
  Param,
  Put,
  Req,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UseGuards } from '@nestjs/common';
import { WaiterGuard } from 'src/guards/waiter.guard';
import { ChefGuard } from 'src/guards/chef.guard';
import { ChashierGuard } from 'src/guards/chashier.guard';
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

  @Put('cook/:id')
  @UseGuards(ChefGuard)
  async cook(@Param('id') id: string, @Req() { user }: { user: user }) {
    try {
      return this.orderService.cook(id, user);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get('pay/:id')
  @UseGuards(ChashierGuard)
  async pay(@Param('id') id: string, @Req() { user }: { user: user }) {
    try {
      return this.orderService.pay(id, user);
    } catch (err) {
      throw new BadRequestException(err.message);
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
