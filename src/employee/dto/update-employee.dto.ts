import { EmployeeStatus, EmployeePosition } from '../schemas/employee.schema';
import { IsEnum, IsString } from 'class-validator';

export class UpdateEmployeeDto {
  @IsString()
  readonly name: string;

  @IsEnum(EmployeePosition)
  readonly position: string;

  @IsEnum(EmployeeStatus)
  readonly status: EmployeeStatus;
}
