import { createSlice } from '@reduxjs/toolkit'

export const appSlide = createSlice({
  name: 'app',
  initialState: {
    sidebarShow: false,
    isLoggedIn: false,
    infoUser: null,
    sidebarUnfoldable: false,
  },
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

export const { setIsLoggedIn, setSidebarShow, setInfoUser, setSidebarUnfoldable } = appSlide.actions

export default appSlide.reducer
