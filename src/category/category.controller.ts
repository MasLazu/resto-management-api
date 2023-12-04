import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Param,
  InternalServerErrorException,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { NotFoundException } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AdminGuard)
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    try {
      return this.categoryService.create(createCategoryDto);
    } catch {
      throw new InternalServerErrorException('Error creating category!');
    }
  }

  @Get()
  async findAll(): Promise<Category[]> {
    try {
      return this.categoryService.findAll();
    } catch {
      throw new InternalServerErrorException('Error getting categories!');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
    try {
      const category = await this.categoryService.findOne(id);
      if (!category) throw new Error();
      return category;
    } catch {
      throw new NotFoundException('Category does not exist!');
    }
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    try {
      const category = this.categoryService.update(id, updateCategoryDto);
      if (!category) throw new Error();
      return category;
    } catch {
      throw new NotFoundException('Category does not exist!');
    }
  }
}
