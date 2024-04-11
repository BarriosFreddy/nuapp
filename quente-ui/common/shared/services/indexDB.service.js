import { quenteDB } from "../db/indexDB";

class IndexDBService {
  constructor() {
  }

  async bulkPutItems(items) {
    await quenteDB.items.bulkPut(items)
  }

  async saveBilling(billing){
    await quenteDB.billings.add(billing)
  }
}

export default new IndexDBService();
