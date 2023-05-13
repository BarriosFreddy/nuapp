import { singleton } from 'tsyringe';
import SequencedCodeModel, {
  SequencedCode,
} from '../models/sequenced-code.model';
import { Types } from 'mongoose';

@singleton()
export class SequencedCodeService {
  async findLastOne(): Promise<SequencedCode | null> {
    return await SequencedCodeModel.findOne()
      .sort({ sequence: -1 })
      .limit(1)
      .exec();
  }

  async update(_id: Types.ObjectId, sequence: number): Promise<boolean | null> {
    try {
      const { modifiedCount } = await SequencedCodeModel.updateOne(
        { _id },
        { $set: { sequence } },
      );
      return !!modifiedCount;
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }
}
