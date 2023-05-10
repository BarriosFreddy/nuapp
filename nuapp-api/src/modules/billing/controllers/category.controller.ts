import { CategoryService } from '../services/category.service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Category } from '../models/category.model';

const categoryService = container.resolve(CategoryService);

class CategorysController {
  async findAll(req: Request, res: Response) {
    const { parse } = req.query;
    const categories = await categoryService.findAll();
    if (parse === 'true') {
      let itemCategoriesParse = categories.map(({ name, _id }) => {
        return {
          label: name,
          value: _id,
        };
      });
      res.status(200).send(itemCategoriesParse);
      return;
    }
    res.status(200).send(categories);
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    const category = await categoryService.findOne(id);
    res.status(200).send(category);
  }

  async save(req: Request, res: Response) {
    const category: Category = req.body;
    const savedCategory = await categoryService.save(category);
    res.status(201).send(savedCategory);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const category: Category = req.body;
    const savedCategory = await categoryService.update(id, category);
    savedCategory
      ? res.status(201).send(savedCategory)
      : res.status(400).send('Something went wrong');
  }
}

const categoryController = new CategorysController();
export default categoryController;
