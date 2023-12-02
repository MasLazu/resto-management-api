import { EmployeeStatus, EmployeePosition } from '../schemas/employee.schema';
import { IsEnum, IsString, IsOptional } from 'class-validator';

export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsEnum(EmployeePosition)
  readonly position: EmployeePosition;

  @IsOptional()
  @IsEnum(EmployeeStatus)
  readonly status: EmployeeStatus;
}
