import { saveSuccess, setBillings } from '../reducers/billings.reducer'

export const saveBilling = (billing) => async (dispatch, _, api) => {
  const { status } = await api.post('/billings', billing)
  status === 201 ? dispatch(saveSuccess(true)) : dispatch(saveSuccess(false))
}

export const getBillings =
  ({ page = 1 } = {}) =>
  async (dispatch, _, api) => {
    const { data, status } = await api.get(`/billings?page=${page}`)
    if (status === 200) dispatch(setBillings(data))
  }
