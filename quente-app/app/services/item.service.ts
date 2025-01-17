import { ApiResponse } from "apisauce";
import { api } from "./api";
import { Item } from "../models/Item";
import sqliteService from "./sqlite.service";
import ItemServiceDAO from "./itemServiceDAO";
import ApiFeedbackResponse from "./apiFeedbackResponse";
import { getMainPrice } from "@/utils";
import { hexoid } from "hexoid";
const OBJECT_ID_LENGTH = 24;
const generateNewId = hexoid(OBJECT_ID_LENGTH)


class ItemService implements ItemServiceDAO<Item> {
  private TABLE_NAME = "items";
  constructor() {}

  async update(item: Item): Promise<ApiFeedbackResponse> {
    try {
      const { _id, ...itemToUpdate } = item;
      setImmediate(async () => {
        await api.apisauce.put(`items/${_id}`, itemToUpdate);
      });
      const dataClone = {
        code: item.code,
        name: item.name,
        price: getMainPrice(item) || 0,
        data: JSON.stringify(item),
      };
      const response = await sqliteService.update(
        this.TABLE_NAME,
        _id,
        dataClone
      );

      return { ok: !!response, data: response };
    } catch (e) {
      console.error(e);
      return { ok: false, data: undefined };
    }
  }

  async save(item: Item): Promise<ApiFeedbackResponse> {
    try {
      /*       const { ok, data }: ApiResponse<Item> = await api.apisauce.post(
        `items`,
        item
      ); */
      const itemClone = {
        _id: generateNewId(),
        code: item.code,
        name: item.name,
        price: getMainPrice(item) || 0,
        data: JSON.stringify(item),
      };
      const response = await sqliteService.insert(this.TABLE_NAME, itemClone);

      console.log("saving ", { response });

      return { ok: !!response, data: response };
    } catch (error) {
      console.error("Error trying to save item ", error);
      return { ok: false, data: undefined };
    }
  }

  async getAllItems() {
    try {
      const response: ApiResponse<any> = await api.apisauce.get(
        `items?size=1000`
      );
      let resultSet = [];
      if (response.ok) {
        const dataArray = response.data;
        const dataClone = dataArray.map((dataItem: any) => ({
          _id: dataItem._id,
          code: dataItem.code,
          name: dataItem.name,
          price: getMainPrice(dataItem) || 0,
          data: JSON.stringify(dataItem),
        }));
        await sqliteService.insertBulk(this.TABLE_NAME, dataClone);
        resultSet = await sqliteService.query(this.TABLE_NAME);
      }
      return { ok: !!resultSet, data: resultSet };
    } catch (e) {
      console.error(e);
      return { ok: false, data: undefined };
    }
  }

  async getItems(searchTerm: string) {
    try {
      const resultSet = await sqliteService.query(this.TABLE_NAME, {
        name: searchTerm,
        code: searchTerm,
      });
      return { ok: !!resultSet, data: resultSet };
    } catch (e) {
      console.error(e);
      return { ok: false, data: undefined };
    }
  }
}

const itemService = new ItemService();
export default itemService;
