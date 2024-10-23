import { ApiResponse } from "apisauce";
import { api } from "./api";
import { Item } from "../models/Item";
import sqliteService from "./sqlite.service";

class ItemService {
  constructor() {}
  
  async update(item: Item) {
    const itemId = item._id;
    const { _id, ...itemToUpdate } = item;
    const response: ApiResponse<any> = await api.apisauce.put(
      `items/${itemId}`,
      itemToUpdate
    );
    return response;
  }
  async save(item: Item) {
    const response: ApiResponse<any> = await api.apisauce.post(`items`, item);
    return response;
  }

  async getAllItems() {
    const response: ApiResponse<any> = await api.apisauce.get(`items?size=1000`);
    let resultSet = [];
    if (response.ok) {
      const dataArray = response.data
      await sqliteService.insertBulk(
        dataArray
      );
      resultSet = await sqliteService.query("items");
    }
    return { ok: !!resultSet, data: resultSet };
  }
  async getItems(searchTerm: string) {
    const resultSet = await sqliteService.query("items", {
      name: searchTerm,
      code: searchTerm,
    });
   /* const response: ApiResponse<any> = await api.apisauce.get(`items`, {
      name: searchTerm,
      code: searchTerm,
    }); */
    return { ok: !!resultSet, data: resultSet };
  }
}

const itemService = new ItemService();
export default itemService;
