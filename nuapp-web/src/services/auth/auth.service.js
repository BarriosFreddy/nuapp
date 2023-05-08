import { setIsLoggedIn } from 'src/app.slice'

export const login = (userAccountLogin) => async (dispatch, _, api) => {
  const { status } = await api.post('/auth/authenticate', userAccountLogin)
  if (status === 200) dispatch(setIsLoggedIn(true))
}
