import { saveSuccess, setItemCategories } from '../reducers/item-categories.reducer'

export const saveItemCategory = (billing) => async (dispatch, _, api) => {
  const { status } = await api.post('/item-categories', billing)
  status === 200 ? dispatch(saveSuccess(true)) : dispatch(saveSuccess(false))
}

export const getItemCategories = (page) => async (dispatch, _, api) => {
  const { data, status } = await api.get(`/item-categories?page=${page}`)
  if (status === 200) dispatch(setItemCategories(data))
}
