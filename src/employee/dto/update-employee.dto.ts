import { EmployeeStatus, EmployeePosition } from '../schemas/employee.schema';
import { IsEnum } from 'class-validator';

export class UpdateEmployeeDto {
  readonly name: string;

  @IsEnum(EmployeePosition)
  readonly position: EmployeePosition;

  @IsEnum(EmployeeStatus)
  readonly status: EmployeeStatus;
}
