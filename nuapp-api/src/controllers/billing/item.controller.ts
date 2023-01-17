import { ItemService } from '../../services/billing/item.service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Item } from '../../models/billing/item.model';

const itemsService = container.resolve(ItemService);

class ItemsController {
  async findAll(_req: Request, res: Response) {
    const items = await itemsService.findAll();
    res.status(200).send(items);
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    const item = await itemsService.findOne(id);
    res.status(200).send(item);
  }

  async save(req: Request, res: Response) {
    const item: Item = req.body;
    const savedItem = await itemsService.save(item);
    res.status(201).send(savedItem);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const item: Item = req.body;
    const savedItem = await itemsService.update(id, item);
    savedItem
      ? res.status(201).send(savedItem)
      : res.status(400).send('Something went wrong');
  }
}

const itemController = new ItemsController();
export default itemController;
