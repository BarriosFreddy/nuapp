import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { api } from "../services/api"
import { Item, ItemModel } from "./Item"
import { withSetPropAction } from "./helpers/withSetPropAction"
import itemService from "../services/item.service"

export const ItemStoreModel = types
  .model("ItemStore")
  .props({
    fetching: false,
    item: types.maybe(ItemModel),
    items: types.array(ItemModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async getAllItems() {
      const response = await itemService.getAllItems()
      if (response.ok) {
        store.setProp("items", response.data)
      } else {
        console.error(`Error fetching items: ${JSON.stringify(response)}`)
      }
    },
    async getItems(searchTerm: string) {
      store.setProp("fetching", true)
      const response = await itemService.getItems(searchTerm)
      if (response.ok) {
        store.setProp("items", response.data)
      } else {
        console.error(`Error fetching items: ${JSON.stringify(response)}`)
      }
      store.setProp("fetching", false)
    },
    setItems(items: Item[]) {
      store.setProp("items", items)
    }
  }))

export interface ItemStore extends Instance<typeof ItemStoreModel> {}
export interface ItemStoreSnapshot extends SnapshotOut<typeof ItemStoreModel> {}
