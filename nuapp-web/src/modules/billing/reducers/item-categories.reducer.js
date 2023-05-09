import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  saveSuccess: false,
  itemCategories: [],
  itemCategory: null,
}

export const itemsSlice = createSlice({
  name: 'item-categories',
  initialState,
  reducers: {
    saveSuccess: (state, action) => void (state.saveSuccess = action.payload),
    setItemCategories: (state, action) => void (state.itemCategories = action.payload),
    setItemCategory: (state, action) => void (state.itemCategory = action.payload),
  },
})

export const { saveSuccess, setItemCategories, setItemCategory } = itemsSlice.actions

export default itemsSlice.reducer
