import { EmployeeStatus, EmployeePosition } from '../schemas/employee.schema';

export class ResponseEmployeeDto {
  name: string;

  position: EmployeePosition;

  status: EmployeeStatus;
}
