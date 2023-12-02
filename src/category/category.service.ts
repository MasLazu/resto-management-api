import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: mongoose.Model<Category>,
  ) {}

  async create(category: CreateCategoryDto): Promise<Category> {
    return await this.categoryModel.create(category);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryModel.find();
  }

  async findOne(id: string): Promise<Category> {
    return await this.categoryModel.findById(id);
  }

  async update(
    id: string,
    updateEmployeeDto: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.categoryModel.findByIdAndUpdate(id, updateEmployeeDto, {
      new: true,
      runValidators: true,
    });
  }
}
