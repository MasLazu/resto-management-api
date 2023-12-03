import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu } from './schemas/menu.schema';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { NotFoundException } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @UseGuards(AdminGuard)
  async create(@Body() createMenuDto: CreateMenuDto): Promise<Menu> {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  async findAll(): Promise<Menu[]> {
    return this.menuService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Menu> {
    const menu = await this.menuService.findOne(id);
    if (!menu) throw new NotFoundException('Menu does not exist!');
    return menu;
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  async update(
    @Param('id') id: string,
    @Body() updateMenuDto: UpdateMenuDto,
  ): Promise<Menu> {
    const menu = this.menuService.update(id, updateMenuDto);
    if (!menu) throw new NotFoundException('Menu does not exist!');
    return menu;
  }
}
