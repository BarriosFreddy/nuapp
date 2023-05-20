import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  saveSuccess: false,
  items: [],
  item: null,
  loading: false,
}

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    saveSuccess: (state, action) => void (state.saveSuccess = action.payload),
    setLoading: (state, action) => void (state.loading = action.payload),
    setItems: (state, action) => void (state.items = action.payload),
    setItem: (state, action) => void (state.item = action.payload),
  },
})

export const { saveSuccess, setItems, setItem } = itemsSlice.actions

export default itemsSlice.reducer
