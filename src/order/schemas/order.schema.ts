import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum OrderStatus {
  ORDERED = 'ordered',
  COOKED = 'cooked',
  DELIVERED = 'delivered',
  PAID = 'paid',
}

@Schema()
export class Employee {
  @Prop()
  _id: string;

  @Prop()
  name: string;
}

@Schema()
export class MenuItem {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  quantity: number;
}

@Schema({ timestamps: true })
export class Order {
  @Prop()
  customerName: string;

  @Prop()
  tableNumber: number;

  @Prop()
  status: OrderStatus;

  @Prop()
  waiter: Employee;

  @Prop()
  chef: Employee;

  @Prop()
  chashier: Employee;

  @Prop()
  total: number;

  @Prop()
  items: MenuItem[];
}
export const OrderSchema = SchemaFactory.createForClass(Order);
