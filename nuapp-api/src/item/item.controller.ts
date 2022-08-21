import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemDto } from './dto/item.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('/code/:code')
  async findByCode(@Param('code') code: string) {
    const item = await this.itemService.findByCode(code);
    const result = { data: item };
    return result;
  }

  @Post()
  create(@Body() itemDto: ItemDto) {
    return this.itemService.save(itemDto);
  }

  @Get('')
  async findAll(@Query('page') page: number) {
    const items = await this.itemService.findAll(page);
    const result = { data: items };
    return result;
  }
}
