import { EmployeeStatus, EmployeePosition } from '../schemas/employee.schema';
import { IsEnum, IsString, IsNotEmpty } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(EmployeePosition)
  position: EmployeePosition;

  @IsNotEmpty()
  @IsEnum(EmployeeStatus)
  status: EmployeeStatus;
}
