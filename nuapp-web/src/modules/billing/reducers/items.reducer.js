import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  saveSuccess: false,
  items: [],
  item: null,
}

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    saveSuccess: (state, action) => void (state.saveSuccess = action.payload),
    setItems: (state, action) => void (state.items = action.payload),
    setItem: (state, action) => void (state.item = action.payload),
  },
})

export const { saveSuccess, setItems, setItem } = itemsSlice.actions

export default itemsSlice.reducer
