import { EnumerationService } from '../services/enumeration.service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Enumeration } from '../models/enumeration.model';

const enumerationService = container.resolve(EnumerationService);

class EnumerationsController {
  async findAll(_req: Request, res: Response) {
    const categories = await enumerationService.findAll();
    res.status(200).send(categories);
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;    
    const enumeration = await enumerationService.findOne(id);
    res.status(200).send(enumeration);
  }

  async save(req: Request, res: Response) {
    const enumeration: Enumeration = req.body;
    console.log({ enumeration });

    const savedEnumeration = await enumerationService.save(enumeration);
    res.status(201).send(savedEnumeration);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const enumeration: Enumeration = req.body;
    const savedEnumeration = await enumerationService.update(id, enumeration);
    savedEnumeration
      ? res.status(201).send(savedEnumeration)
      : res.status(400).send('Something went wrong');
  }
}

const enumerationController = new EnumerationsController();
export default enumerationController;
