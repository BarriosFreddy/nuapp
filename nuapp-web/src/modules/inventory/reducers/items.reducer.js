import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  saveSuccess: false,
  items: [],
  item: null,
  loading: false,
  existsByCode: false,
  offline: {
    items: [],
  },
}

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    saveSuccess: (state, action) => void (state.saveSuccess = action.payload),
    setExistsByCode: (state, action) => void (state.existsByCode = action.payload),
    setLoading: (state, action) => void (state.loading = action.payload),
    setItems: (state, action) => void (state.items = action.payload),
    setItem: (state, action) => void (state.item = action.payload),
    setItemsLocally: (state, action) => void (state.offline.items = action.payload),
    getItemsLocally: (state, _) => void (state.items = state.offline.items),
  },
})

export const {
  saveSuccess,
  setItems,
  setItem,
  setLoading,
  setItemsLocally,
  getItemsLocally,
  setExistsByCode,
} = itemsSlice.actions

export default itemsSlice.reducer
