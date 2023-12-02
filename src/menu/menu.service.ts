import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Menu } from './schemas/menu.schema';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel('Menu') private readonly menuModel: mongoose.Model<any>,
  ) {}

  async create(menu: CreateMenuDto): Promise<Menu> {
    return await this.menuModel.create(menu);
  }

  async findAll(): Promise<Menu[]> {
    return await this.menuModel.find();
  }

  async findOne(id: string): Promise<Menu> {
    return await this.menuModel.findById(id);
  }

  async update(id: string, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    return await this.menuModel.findByIdAndUpdate(id, updateMenuDto, {
      new: true,
      runValidators: true,
    });
  }
}
