import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import mongoose from 'mongoose';

@modelOptions({
    options: {
      customName: 'sequenced-codes',
    },
  })
export class SequencedCode {
  _id!: mongoose.Types.ObjectId;
  @prop({ required: true })
  public prefixPart1!: string;
  @prop({ required: true })
  public prefixPart2!: string;
  @prop({ required: true })
  public sequence?: number;
}

const SequencedCodeModel = getModelForClass(SequencedCode);
export default SequencedCodeModel;
