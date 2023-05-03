import { ItemService } from '../../services/billing/item.service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Item } from '../../models/billing/item.model';

const itemsService = container.resolve(ItemService);

interface RequestQuery {
  page?: number;
  name?: string;
  code?: string;
}
class ItemsController {
  async findAll(req: Request<{}, {}, {}, RequestQuery>, res: Response) {
    let { page = 1, name, code } = req.query;
    page = +page;
    const items = await itemsService.findAll({ name, code, page });
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

  async saveAll(req: Request, res: Response) {
    const items: Item[] = req.body;
    const result = await itemsService.saveAll(items);
    res.status(201).send(result);
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
