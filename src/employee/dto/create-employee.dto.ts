import { EmployeeStatus, EmployeePosition } from '../schemas/employee.schema';
import { IsEnum, IsString, IsNotEmpty } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEnum(EmployeePosition)
  readonly position: EmployeePosition;

  @IsNotEmpty()
  @IsEnum(EmployeeStatus)
  readonly status: EmployeeStatus;
}
