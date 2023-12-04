import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './schemas/employee.schema';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { NotFoundException } from '@nestjs/common';
import { ResponseEmployeeDto } from './dto/reponse-employee.dto';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @UseGuards(AdminGuard)
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<ResponseEmployeeDto> {
    try {
      return this.employeeService.create(createEmployeeDto);
    } catch {
      throw new InternalServerErrorException('Error creating employee!');
    }
  }

  @Get()
  async findAll(): Promise<ResponseEmployeeDto[]> {
    try {
      return this.employeeService.findAll();
    } catch {
      throw new InternalServerErrorException('Error getting employees!');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseEmployeeDto> {
    try {
      const employee = await this.employeeService.findOne(id);
      if (!employee) throw new NotFoundException('Employee does not exist!');
      return employee;
    } catch {
      throw new NotFoundException('Employee does not exist!');
    }
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: Employee,
  ): Promise<ResponseEmployeeDto> {
    try {
      const employee = this.employeeService.update(id, updateEmployeeDto);
      if (!employee) throw new NotFoundException('Employee does not exist!');
      return employee;
    } catch {
      throw new NotFoundException('Employee does not exist!');
    }
  }
}
