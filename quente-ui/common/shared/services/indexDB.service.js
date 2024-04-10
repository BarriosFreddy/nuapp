import { quenteDB } from "../db/indexDB";

class IndexDBService {
  constructor() {
  }

  async bulkPutItems(items) {
    await quenteDB.items.bulkPut(items)
  }
}

export default new IndexDBService();
