import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { Item, ItemDTOModel, ItemModel } from "./Item";
import { withSetPropAction } from "./helpers/withSetPropAction";
import itemService from "@/services/item.service";

export const ItemStoreModel = types
  .model("ItemStore")
  .props({
    fetching: false,
    saving: false,
    updating: false,
    item: types.maybe(ItemModel),
    items: types.array(ItemDTOModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async getAllItems() {
      const response = await itemService.getAllItems();
      if (response.ok) {
        store.setProp("items", response.data);
      } else {
        console.error(`Error fetching items: ${JSON.stringify(response)}`);
      }
      return response;
    },
    async getItems(searchTerm: string) {
      store.setProp("fetching", true);
      const response = await itemService.getItems(searchTerm);
      
      if (response.ok) {
        store.setProp("items", response.data);
      } else {
        console.error(`Error fetching items: ${JSON.stringify(response)}`);
      }
      store.setProp("fetching", false);
      return response;
    },
    setItems(items: Item[]) {
      store.setProp("items", items);
    },
    async saveItem(item: Item) {
      store.setProp("saving", true);
      const response = await itemService.save(item);
      if (response.ok) {
        store.setProp("item", response.data);
      } else {
        console.error(`Error saving item: ${JSON.stringify(response)}`);
      }
      store.setProp("saving", false);
      return response;
    },
    async updateItem (item: Item) {
      store.setProp("updating", true);
      const response = await itemService.update(item);
      if (response.ok) {
        store.setProp("item", response.data);
      } else {
        console.error(`Error updating item: ${JSON.stringify(response)}`);
      }
      store.setProp("updating", false);
      return response;
    },
  }));

export interface ItemStore extends Instance<typeof ItemStoreModel> {}
export interface ItemStoreSnapshot extends SnapshotOut<typeof ItemStoreModel> {}
