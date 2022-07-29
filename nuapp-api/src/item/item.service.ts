import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemDocument } from './schemas/item.schema';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
  constructor(@InjectModel('item') private itemModel: Model<ItemDocument>) {}
  create(createItemDto: CreateItemDto) {
    return 'This action adds a new item';
  }

  async findAll() {
    return await this.itemModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  findByCode(code: string): Item {
    return new Item();
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
