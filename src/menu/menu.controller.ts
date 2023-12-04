import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu } from './schemas/menu.schema';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @UseGuards(AdminGuard)
  async create(@Body() createMenuDto: CreateMenuDto): Promise<Menu> {
    try {
      return await this.menuService.create(createMenuDto);
    } catch {
      throw new InternalServerErrorException('Error creating menu!');
    }
  }

  @Get()
  async findAll(): Promise<Menu[]> {
    try {
      return this.menuService.findAll();
    } catch {
      throw new InternalServerErrorException('Error getting menus!');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Menu> {
    try {
      const menu = await this.menuService.findOne(id);
      if (!menu) throw new Error();
      return menu;
    } catch {
      throw new NotFoundException('Menu does not exist!');
    }
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  async update(
    @Param('id') id: string,
    @Body() updateMenuDto: UpdateMenuDto,
  ): Promise<Menu> {
    try {
      const menu = this.menuService.update(id, updateMenuDto);
      if (!menu) throw new Error();
      return menu;
    } catch {
      throw new NotFoundException('Menu does not exist!');
    }
  }
}
