import { saveSuccess, setItems } from '../reducers/items.reducer'

export const saveItem = (item) => async (dispatch, _, api) => {
  const { status } = await api.post('/items', item)
  status === 201 ? dispatch(saveSuccess(true)) : dispatch(saveSuccess(false))
}

export const updateItem = (item) => async (dispatch, _, api) => {
  const itemToUpdate = { ...item }
  const id = itemToUpdate._id
  delete itemToUpdate._id
  const { status } = await api.put(`/items/${id}`, itemToUpdate)
  status === 201 ? dispatch(saveSuccess(true)) : dispatch(saveSuccess(false))
}

export const saveItemCategoriesBulk = (items) => async (dispatch, _, api) => {
  const { status } = await api.post('/items/bulk', items)
  status === 201 ? dispatch(saveSuccess(true)) : dispatch(saveSuccess(false))
}

export const getItems = (queryParams) => async (dispatch, _, api) => {
  const urlQueryParams = new URLSearchParams(queryParams).toString()
  const { data, status } = await api.get(
    `/items${urlQueryParams.length > 0 ? '?' + urlQueryParams.toString() : ''}`,
  )
  if (status === 200) dispatch(setItems(data))
}
