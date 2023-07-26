import {
  saveSuccess,
  setFetching,
  setPurchaseOrders,
  setSaving,
} from '../reducers/purchase-orders.reducer'

export const savePurchaseOrder = (item) => async (dispatch, _, api) => {
  dispatch(setSaving(true))
  const { status } = await api.post('/purchase-orders', item)
  dispatch(saveSuccess(status === 201))
  dispatch(setSaving(false))
}

export const updatePurchaseOrder = (item) => async (dispatch, _, api) => {
  dispatch(setSaving(true))
  const purchaseOrderToUpdate = { ...item }
  const id = purchaseOrderToUpdate._id
  delete purchaseOrderToUpdate._id
  const { status } = await api.put(`/purchase-orders/${id}`, purchaseOrderToUpdate)
  dispatch(saveSuccess(status === 201))
  dispatch(setSaving(false))
}

export const getPurchaseOrders = (item) => async (dispatch, _, api) => {
  dispatch(setFetching(true))
  const { status, data } = await api.get('/purchase-orders?page=1', item)
  status === 200 && dispatch(setPurchaseOrders(data))
  dispatch(setFetching(false))
}
