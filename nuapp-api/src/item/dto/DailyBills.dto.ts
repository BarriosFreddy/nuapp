import { ItemDto } from './item.dto';

export class DailyBillsDto {
  date: string;
  createdAt: string;
  total: number;
  items: ItemDto[];
}
