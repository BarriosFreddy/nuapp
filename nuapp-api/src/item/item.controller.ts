import { Controller, Get, Param } from '@nestjs/common';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('/code/:code')
  async findByCode(@Param('code') code: string) {
    const item = await this.itemService.findByCode(code);
    const result = { data: item };
    return result;
  }
}
