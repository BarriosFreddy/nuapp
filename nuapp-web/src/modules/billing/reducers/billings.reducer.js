import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  saveSuccess: false,
  billings: [],
  billing: null,
}

export const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    setSaveSuccess: (state, action) => void (state.saveSuccess = action.payload),
    setBillings: (state, action) => void (state.billings = action.payload),
    setBilling: (state, action) => void (state.billing = action.payload),
  },
})

export const { setSaveSuccess, setBillings, setBilling } = billingSlice.actions

export default billingSlice.reducer
