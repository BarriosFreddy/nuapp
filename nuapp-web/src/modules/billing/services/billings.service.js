import {
  setSaveSuccess,
  setBillings,
  saveBillingLocally,
  setLoading,
  setBillingsGraph,
} from '../reducers/billings.reducer'
import isOnline from 'is-online'
let isonline = false

export const saveBilling = (billing) => async (dispatch, getState, api) => {
  isonline = await isOnline()
  dispatch(setLoading(true))
  const { status } = isonline
    ? await api.post('/billings', billing)
    : saveLocally(dispatch, getState(), billing)
  status === 201 ? dispatch(setSaveSuccess(true)) : dispatch(setSaveSuccess(false))
  dispatch(setLoading(false))
}

export const saveBillingBulk = (billings) => async (dispatch, getState, api) => {
  isonline = await isOnline()
  dispatch(setLoading(true))
  const { status } = await api.post('/billings/bulk', billings)
  status === 201 ? dispatch(setSaveSuccess(true)) : dispatch(setSaveSuccess(false))
  dispatch(setLoading(false))
}

export const getBillings =
  ({ page = 1 } = {}) =>
  async (dispatch, getState, api) => {
    isonline = await isOnline()
    const { data, status } = isonline
      ? await api.get(`/billings?page=${page}`)
      : getLocally(dispatch, getState())
    if (status === 200) dispatch(setBillings(data))
  }

export const getBillingsGTDate = (date) => async (dispatch, _, api) => {
  const { data, status } = await api.get(`/billings/per/${date}`)
  if (status === 200) dispatch(setBillingsGraph(data))
}

function saveLocally(dispatch, state, billing) {
  const { billings } = state.billing.offline
  let billingsArray = []
  if (Array.isArray(billings)) {
    const arr = JSON.parse(JSON.stringify(billings))
    billingsArray = [...billingsArray, ...arr]
  }
  billingsArray.unshift(billing)
  dispatch(saveBillingLocally(billingsArray))
  return { status: 201 }
}

function getLocally(dispatch, state) {
  const billings = [state.billing.offline.billings]
  if (billings.length > 10) billings.length = 10
  dispatch(setBillings(billings))
  return { data: billings, status: 200 }
}
