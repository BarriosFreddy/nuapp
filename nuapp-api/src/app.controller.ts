import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
//import { ItemService } from './item/item.service';

@Controller({})
export class AppController {
  //constructor(private itemService: ItemService) {}

  @Get()
  getHello() {
    //return this.itemService.findAll();
  }
}
