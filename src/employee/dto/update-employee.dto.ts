import { EmployeeStatus, EmployeePosition } from '../schemas/employee.schema';
import { IsEnum, IsString, IsOptional } from 'class-validator';

export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(EmployeePosition)
  position: EmployeePosition;

  @IsOptional()
  @IsEnum(EmployeeStatus)
  status: EmployeeStatus;
}
