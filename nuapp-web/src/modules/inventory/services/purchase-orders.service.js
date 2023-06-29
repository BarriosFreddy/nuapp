import {
  saveSuccess,
  setFetching,
  setPurchaseOrders,
  setSaving,
} from '../reducers/purchase-orders.reducer'

export const saveAll = (item) => async (dispatch, _, api) => {
  dispatch(setSaving(true))
  const { status } = await api.post('/purchase-orders', item)
  dispatch(saveSuccess(status === 201))
  dispatch(setSaving(false))
}

export const getPurchaseOrders = (item) => async (dispatch, _, api) => {
  dispatch(setFetching(true))
  const { status, data } = await api.get('/purchase-orders?page=1', item)
  status === 200 && dispatch(setPurchaseOrders(data))
  dispatch(setFetching(false))
}
