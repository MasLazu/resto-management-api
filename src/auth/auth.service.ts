import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EmployeeService } from 'src/employee/employee.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private employeeService: EmployeeService,
    private jwtService: JwtService,
  ) {}

  async signIn(id: string, pass: string): Promise<{ access_token: string }> {
    const employee = await this.employeeService.fundOneWithPassword(id);
    if (!employee) {
      throw new UnauthorizedException(
        "Employee doesn't exist or password is wrong",
      );
    }

    if (employee.status === 'inactive') {
      throw new UnauthorizedException('Employee is inactive');
    }

    const isMatch = await bcrypt.compare(pass, employee.password);
    if (!isMatch) {
      throw new UnauthorizedException(
        "Employee doesn't exist or password is wrong",
      );
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
