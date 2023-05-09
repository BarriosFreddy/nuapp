import { saveSuccess, setItems } from '../reducers/items.reducer'

export const saveItem = (item) => async (dispatch, _, api) => {
  const { status } = await api.post('/items', item)
  status === 200 ? dispatch(saveSuccess(true)) : dispatch(saveSuccess(false))
}

export const saveItemCategoriesBulk = (items) => async (dispatch, _, api) => {
  const { status } = await api.post('/items/bulk', items)
  status === 200 ? dispatch(saveSuccess(true)) : dispatch(saveSuccess(false))
}

export const getItems = (queryParams) => async (dispatch, _, api) => {
  const urlQueryParams = new URLSearchParams(queryParams).toString()
  const { data, status } = await api.get(
    `/items${urlQueryParams.length > 0 ? '?' + urlQueryParams.toString() : ''}`,
  )
  if (status === 200) dispatch(setItems(data))
}
