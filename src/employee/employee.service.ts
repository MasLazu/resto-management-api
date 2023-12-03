import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Employee } from './schemas/employee.schema';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ResponseEmployeeDto } from './dto/reponse-employee.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: mongoose.Model<Employee>,
  ) {}

  async create(employee: CreateEmployeeDto): Promise<ResponseEmployeeDto> {
    employee.password = await bcrypt.hash(
      employee.password,
      await bcrypt.genSalt(10),
    );
    const result = await this.employeeModel.create(employee);
    const { password, ...res } = result['_doc'];
    return res;
  }

  async findAll(): Promise<ResponseEmployeeDto[]> {
    return await this.employeeModel.find({}, { password: 0 });
  }

  async findOne(id: string): Promise<ResponseEmployeeDto> {
    return await this.employeeModel.findById(id, { password: 0 });
  }

  async fundOneWithPassword(id: string): Promise<Employee> {
    return await this.employeeModel.findById(id);
  }

  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<ResponseEmployeeDto> {
    const result = await this.employeeModel.findByIdAndUpdate(
      id,
      updateEmployeeDto,
      {
        new: true,
        runValidators: true,
      },
    );
    const { password, ...res } = result['_doc'];
    return res;
  }
}
