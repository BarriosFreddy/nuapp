import { singleton } from 'tsyringe';
import SequencedCodeModel from '../db/models/sequenced-code.model';
import { SequencedCode } from '../entities/SequencedCode';

@singleton()
export class SequencedCodeService {
  async findLastOne(): Promise<SequencedCode | null> {
    return await SequencedCodeModel.findOne()
      .sort({ sequence: -1 })
      .limit(1)
      .exec();
  }

  async update(_id: any, sequence: number): Promise<boolean | null> {
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
