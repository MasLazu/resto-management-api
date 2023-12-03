import {
  IsNotEmpty,
  IsString,
  IsNumber,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { OrderStatus } from '../schemas/order.schema';

class MenuItem {
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsNumber()
  tableNumber: number;

  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsNotEmpty()
  @IsNumber()
  total: number;

  @IsNotEmpty()
  @ValidateNested()
  items: MenuItem[];
}
