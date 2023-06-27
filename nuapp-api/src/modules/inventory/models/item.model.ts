import mongoose from 'mongoose';
import { itemSchema } from '../db/schemas/item.schema';


const ItemModel = mongoose.model('Item', itemSchema);
export default ItemModel;
