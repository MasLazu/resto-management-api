import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Employee } from './schemas/employee.schema';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: mongoose.Model<Employee>,
  ) {}

  async create(employee: CreateEmployeeDto): Promise<Employee> {
    const res = await this.employeeModel.create(employee);
    return res;
  }

  async findAll(): Promise<Employee[]> {
    return await this.employeeModel.find();
  }

  async findOne(id: string): Promise<Employee> {
    return await this.employeeModel.findById(id);
  }

  async update(id: string, updateEmployeeDto: any): Promise<Employee> {
    return await this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto, {
      new: true,
      runValidators: true,
    });
  }
}
