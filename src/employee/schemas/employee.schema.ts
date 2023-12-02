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
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  position: EmployeePosition;

  @Prop({ required: true })
  status: EmployeeStatus;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
