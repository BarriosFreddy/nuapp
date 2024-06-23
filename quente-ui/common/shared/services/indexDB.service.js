import { quenteDB } from "../db/indexDB";

class IndexDBService {
  constructor() {}

  async bulkPutItems(items) {
    await quenteDB.items.bulkPut(items);
  }

  async saveBilling(billing) {
    await quenteDB.billings.add(billing);
  }

  async findBillings({ size = 10 }) {
    return await quenteDB.billings.limit(size).toArray();
  }
  async deleteBilling(id) {
    return await quenteDB.billings.where('id').equals(id).delete();
  }
}

export default new IndexDBService();
