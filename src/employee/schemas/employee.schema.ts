import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum EmployeeStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum EmployeePosition {
  CHEF = 'chef',
  WAITER = 'waiter',
  CHASHIER = 'chashier',
}

@Schema({ timestamps: true })
export class Employee {
  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  position: EmployeePosition;

  @Prop()
  status: EmployeeStatus;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
