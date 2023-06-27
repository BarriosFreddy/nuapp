import { PipelineStage } from 'mongoose';
import ItemQueryI from '../db/models/item-query.interface';
import { QueryStrategy } from './query-strategy';

export class ItemQueryStrategy implements QueryStrategy {
  constructor(private itemQuery: ItemQueryI) {}

  buildAggregate(): PipelineStage[] {
    let filters: any = {};
    let conditions = [];
    let { name, code, stock, page = 1, size = 10 } = this.itemQuery;

    name && conditions.push({ name: new RegExp(`${name}`, 'i') });
    code && conditions.push({ code: new RegExp(`${code}`, 'i') });
    if (stock) {
      switch (stock) {
        case 'IS':
          filters.stock = { $gte: 1 };
          break;
        case 'WS':
          filters.stock = { $eq: 0 };
          break;
        case 'RP':
          filters = {
            $expr: {
              $lt: ['$stock', '$reorderPoint'],
            },
          };
          break;
        default:
          break;
      }
    }

    conditions.length > 0 && (filters = { ['$or']: conditions, ...filters });

    const aggregateFilters: PipelineStage[] = [
      { $match: filters },
      {
        $project: {
          code: 1,
          name: 1,
          description: 1,
          price: 1,
          cost: 1,
          stock: 1,
          reorderPoint: 1,
          categoryId: 1,
          measurementUnit: 1,
        },
      },
      { $skip: +size * (+page - 1) },
      { $limit: +size },
    ];

    return aggregateFilters;
  }
}
