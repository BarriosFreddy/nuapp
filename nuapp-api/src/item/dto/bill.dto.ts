import { ItemDto } from './item.dto';

export class BillDto {
  code: string;
  items: ItemDto[];
  total: number;
  createdAt: string;
  updateAt: string;
}
