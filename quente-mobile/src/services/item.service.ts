import { ApiResponse } from "apisauce";
import { api } from "./api";

class ItemService {
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
