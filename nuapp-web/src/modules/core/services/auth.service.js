import { setInfoUser, setIsLoggedIn } from 'src/app.slice'
import isOnline from 'is-online'

export const login = (userAccountLogin) => async (dispatch, _, api) => {
  const { status, data } = await api.post('/auth/authenticate', userAccountLogin)
  if (status === 200) {
    dispatch(setIsLoggedIn(true))
    dispatch(setInfoUser(data))
  }
}

export const logout = () => async (dispatch, _, api) => {
  const { status } = await api.get('/auth/logout')
  if (status === 200) {
    dispatch(setIsLoggedIn(false))
    dispatch(setInfoUser(null))
  }
}

export const getInfoUser = () => async (dispatch, getState, api) => {
  const state = getState()
  const isonline = await isOnline()
  const { data, status } = isonline
    ? await api.get('/auth/info-user')
    : { status: 200, data: state.app.infoUser }
  if (status === 200) {
    dispatch(setIsLoggedIn(!!data))
    dispatch(setInfoUser(data))
  }
}
