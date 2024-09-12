import { ApiResponse } from "apisauce";
import { api } from "./api";
import { Item } from "../models/Item";

class ItemService {
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
  constructor() {}

  async getAllItems() {
    const response: ApiResponse<any> = await api.apisauce.get(`items`);
    return response;
  }
  async getItems(searchTerm: string) {
    const response: ApiResponse<any> = await api.apisauce.get(`items`, {
      name: searchTerm,
      code: searchTerm,
    });
    return response;
  }
}

const itemService = new ItemService();
export default itemService;
