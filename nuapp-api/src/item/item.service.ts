import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ItemDto } from './dto/item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemDocument } from './schemas/item.schema';
import { uuid } from 'uuidv4';
import { getCurrentDateAsString } from 'src/helper/utils/DateUtils';

@Injectable()
export class ItemService {
  constructor(@InjectModel('items') private itemModel: Model<ItemDocument>) {}
  async save(itemDto: ItemDto) {
    itemDto.createdAt = getCurrentDateAsString();
    return await this.itemModel.create(itemDto);
  }

  async findAll(page = 1) {
    return await this.itemModel.find({}, {}, { skip: --page * 10 });
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
