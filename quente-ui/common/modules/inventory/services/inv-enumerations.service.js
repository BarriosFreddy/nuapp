import {
  saveSuccess,
  setFetching,
  setInvEnumeration,
  setInvEnumerations,
  setSaving,
} from '../reducers/inv-enumerations.reducer'

export const saveInvEnumeration = (item) => async (dispatch, _, api) => {
  dispatch(setSaving(true))
  const { status } = await api.post('/inv-enumerations', item)
  dispatch(saveSuccess(status === 201))
  dispatch(setSaving(false))
}

export const updateInvEnumeration = (item) => async (dispatch, _, api) => {
  dispatch(setSaving(true))
  const invEnumerationToUpdate = { ...item }
  const id = invEnumerationToUpdate._id
  delete invEnumerationToUpdate._id
  const { status } = await api.put(`/inv-enumerations/${id}`, invEnumerationToUpdate)
  dispatch(saveSuccess(status === 201))
  dispatch(setSaving(false))
}

export const getInvEnumerations = (item) => async (dispatch, _, api) => {
  dispatch(setFetching(true))
  const { status, data } = await api.get('/inv-enumerations?page=1', item)
  status === 200 && dispatch(setInvEnumerations(data))
  dispatch(setFetching(false))
}

export const getInvEnumerationByCode = (code) => async (dispatch, _, api) => {
  dispatch(setFetching(true))
  const { status, data } = await api.get(`/inv-enumerations/code/${code}`)
  status === 200 && dispatch(setInvEnumeration(data))
  dispatch(setFetching(false))
}
