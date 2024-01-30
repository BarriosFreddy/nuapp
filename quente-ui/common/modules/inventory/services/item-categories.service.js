import {
  setSaving,
  setFetching,
  saveSuccess,
  setItemCategories,
  setCodeRegistered,
} from '../reducers/item-categories.reducer'

export const saveItemCategory = (billing) => async (dispatch, _, api) => {
  dispatch(setSaving(true))
  const { status } = await api.post('/item-categories', billing)
  if (status === 201) {
    dispatch(saveSuccess(true))
    dispatch(getItemCategories({ page: 1 }))
  } else {
    dispatch(saveSuccess(false))
  }
  dispatch(setSaving(false))
}

export const updateItemCategory = (itemCategory) => async (dispatch, _, api) => {
  dispatch(setSaving(true))
  const itemCategoryToUpdate = { ...itemCategory }
  const id = itemCategoryToUpdate._id
  delete itemCategoryToUpdate._id
  const { status } = await api.put(`/item-categories/${id}`, itemCategoryToUpdate)
  dispatch(saveSuccess(status === 201))
  dispatch(setSaving(false))
}

export const getItemCategories = (params) => async (dispatch, _, api) => {
  dispatch(setFetching(true))
  const searchParams = new URLSearchParams(params).toString()
  const { data, status } = await api.get(
    `/item-categories${searchParams.length > 0 ? '?' + searchParams : ''}`,
  )
  if (status === 200) dispatch(setItemCategories(data))
  dispatch(setFetching(false))
}

export const validateCodeRegistered = (code) => async (dispatch, _, api) => {
  if (!code) return
  const { data, status } = await api.get(`/item-categories/code/${code}`)
  if (status === 200) dispatch(setCodeRegistered(data))
}
