import { Item } from '../../entities/item.entity';
import { ItemDto } from '../../dtos/item.dto';

/**
 * An User mapper object.
 */
export class ItemMapper {
  static fromDTOtoEntity(itemDTO: ItemDto): Item {
    if (!itemDTO) {
      return;
    }
    const user = new Item();
    const fields = Object.getOwnPropertyNames(itemDTO);
    fields.forEach((field) => {
      user[field] = itemDTO[field];
    });
    return user;
  }

  static fromEntityToDTO(item: Item): ItemDto {
    if (!item) {
      return;
    }
    const itemDTO = new ItemDto();
    const fields = Object.getOwnPropertyNames(itemDTO);
    fields.forEach((field) => {
      itemDTO[field] = itemDTO[field];
    });
    return itemDTO;
  }
}
