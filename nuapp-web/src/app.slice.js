import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarShow: false,
  isLoggedIn: false,
  infoUser: null,
  sidebarUnfoldable: false,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
    },
    setSidebarShow: (state, action) => {
      state.sidebarShow = action.payload
    },
    setInfoUser: (state, action) => {
      state.infoUser = action.payload
    },
    setSidebarUnfoldable: (state, action) => {
      state.sidebarUnfoldable = action.payload
    },
  },
})

export const { setIsLoggedIn, setSidebarShow, setInfoUser, setSidebarUnfoldable } = appSlice.actions

export default appSlice.reducer