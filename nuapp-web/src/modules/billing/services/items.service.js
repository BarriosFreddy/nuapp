import { saveSuccess, setItems, setItemsLocally, setExistsByCode } from '../reducers/items.reducer'
import isOnline from 'is-online'
let isonline = false

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

export const existByCode = (code) => async (dispatch, _, api) => {
  if (!code) return
  const { data, status } = await api.get(`/items/code/${code}`)
  if (status === 200) dispatch(setExistsByCode(data))
}

export const getItems = (queryParams) => async (dispatch, getState, api) => {
  const urlQueryParams = new URLSearchParams(queryParams).toString()
  isonline = await isOnline()
  const { data, status } = isonline
    ? await api.get(`/items${urlQueryParams.length > 0 ? '?' + urlQueryParams.toString() : ''}`)
    : getLocally(getState(), queryParams)
  if (status === 200) dispatch(setItems(data))
}

export const getAllItems = () => async (dispatch, state, api) => {
  const { data, status } = await api.get(`/items`)
  if (status === 200) dispatch(setItemsLocally(data))
}

function getLocally(state, queryParams) {
  const { items } = state.items.offline
  let data = items.filter(
    ({ code, name }) =>
      code.toUpperCase().includes(queryParams.code.toUpperCase()) ||
      name.toUpperCase().includes(queryParams.name.toUpperCase()),
  )
  if (data.length > 10) data.length = 10
  return { data, status: 200 }
}
