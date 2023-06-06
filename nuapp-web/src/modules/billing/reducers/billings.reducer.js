import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  saveSuccess: false,
  loading: false,
  billings: [],
  billingsGraph: [],
  billing: null,
  offline: {
    billings: [],
  },
}

export const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    setSaveSuccess: (state, action) => void (state.saveSuccess = action.payload),
    setBillings: (state, action) => void (state.billings = action.payload),
    setBillingsGraph: (state, action) => void (state.billingsGraph = action.payload),
    saveBillingLocally: (state, action) => void (state.offline.billings = action.payload),
    setBilling: (state, action) => void (state.billing = action.payload),
    setLoading: (state, action) => void (state.loading = action.payload),
  },
})

export const {
  setSaveSuccess,
  setBillings,
  setBilling,
  saveBillingLocally,
  setLoading,
  setBillingsGraph,
} = billingSlice.actions

export default billingSlice.reducer
