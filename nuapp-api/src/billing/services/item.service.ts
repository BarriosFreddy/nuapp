import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemDto } from '../dtos/item.dto';
import { UpdateItemDto } from '../dtos/update-item.dto';
import { Item } from '../entities/item.entity';
import { ItemMapper } from '../utils/mapper/item.mapper';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async save(itemDTO: ItemDto): Promise<ItemDto | undefined> {
    const result = await this.itemRepository.save(itemDTO);
    return ItemMapper.fromEntityToDTO(result);
  }

  async findAll(page = 1) {
    return await this.itemRepository.find({ skip: --page * 10 });
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  async findByCode(code: string) {
    const item = await this.itemRepository.findOneBy({ code });
    return item;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
