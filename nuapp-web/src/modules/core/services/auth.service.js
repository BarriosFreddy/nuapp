import { setInfoUser, setIsLoggedIn } from 'src/app.slice'

export const login = (userAccountLogin) => async (dispatch, _, api) => {
  const { status } = await api.post('/auth/authenticate', userAccountLogin)
  if (status === 200) dispatch(setIsLoggedIn(true))
}

export const logout = () => async (dispatch, _, api) => {
  const { status } = await api.get('/auth/logout')
  if (status === 200) dispatch(setIsLoggedIn(false))
}

export const getInfoUser = () => async (dispatch, _, api) => {
  const { data, status } = await api.get('/auth/info-user')
  if (status === 200) {
    dispatch(setIsLoggedIn(!!data))
    dispatch(setInfoUser(data))
  }
}
