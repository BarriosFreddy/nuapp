import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ItemDto } from './dto/item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemDocument } from './schemas/item.schema';

@Injectable()
export class ItemService {
  constructor(@InjectModel('items') private itemModel: Model<ItemDocument>) {}

  async findAll() {
    return await this.itemModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  async findByCode(code: string) {
    const item = await this.itemModel.findOne({ code });
    return item;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
