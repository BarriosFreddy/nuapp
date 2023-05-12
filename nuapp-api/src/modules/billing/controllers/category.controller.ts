import { CategoryService } from '../services/category.service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Category } from '../models/category.model';

const categoryService = container.resolve(CategoryService);

interface RequestQuery {
  page?: number;
  name?: string;
  code?: string;
  parse?: string;
}

class CategorysController {
  async findAll(req: Request<{}, {}, {}, RequestQuery>, res: Response) {
    let { parse, page = 1, name, code } = req.query;
    page = +page;
    const categories = await categoryService.findAll({ name, code, page });
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
