import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EmployeeService } from 'src/employee/employee.service';
import { Employee } from 'src/employee/schemas/employee.schema';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private employeeService: EmployeeService,
  ) {}

  async signIn(id: string, pass: string): Promise<{ access_token: string }> {
    let employee: Employee;
    try {
      employee = await this.employeeService.fundOneWithPassword(id);
    } catch {
      throw new Error("Employee doesn't exist or password is wrong");
    }

    if (!employee) {
      throw new Error("Employee doesn't exist or password is wrong");
    }

    if (employee.status === 'inactive') {
      throw new Error('Employee is inactive');
    }

    const isMatch = await bcrypt.compare(pass, employee.password);
    if (!isMatch) {
      throw new Error("Employee doesn't exist or password is wrong");
    }

    const payload = {
      sub: employee['_id'],
      name: employee.name,
      position: employee.position,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
