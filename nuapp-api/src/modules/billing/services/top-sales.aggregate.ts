import { PipelineStage } from 'mongoose';

export const getTopSalesItems = (startDate: number): PipelineStage[] => [
  {
    $match: {
      'createdAt.date': {
        $gte: startDate,
      },
    },
  },
  {
    $unwind: {
      path: '$items',
    },
  },
  {
    $group: {
      _id: '$items.name',
      sales: {
        $sum: '$items.units',
      },
    },
  },
  {
    $limit: 10,
  },
  {
    $sort: {
      sales: -1,
    },
  },
  {
    $project: {
      _id: 0,
      name: '$_id',
      sales: 1,
    },
  },
];
