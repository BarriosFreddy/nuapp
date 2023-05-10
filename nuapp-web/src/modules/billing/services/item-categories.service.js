import { saveSuccess, setItemCategories } from '../reducers/item-categories.reducer'

export const saveItemCategory = (billing) => async (dispatch, _, api) => {
  const { status } = await api.post('/item-categories', billing)
  status === 200 ? dispatch(saveSuccess(true)) : dispatch(saveSuccess(false))
}

export const getItemCategories = (params) => async (dispatch, _, api) => {
  const searchParams = new URLSearchParams(params).toString()
  const { data, status } = await api.get(
    `/item-categories${searchParams.length > 0 ? '?' + searchParams : ''}`,
  )
  if (status === 200) dispatch(setItemCategories(data))
}
