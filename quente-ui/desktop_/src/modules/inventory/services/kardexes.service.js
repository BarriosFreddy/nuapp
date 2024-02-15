import { saveSuccess, setSaving } from '../reducers/kardexes.reducer'

export const saveAllKardexes = (item) => async (dispatch, _, api) => {
  dispatch(setSaving(true))
  const { status } = await api.post('/kardex/bulk', item)
  dispatch(saveSuccess(status === 201))
  dispatch(setSaving(false))
}
