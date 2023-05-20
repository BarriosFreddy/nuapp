import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarShow: true,
  sidebarUnfoldable: true,
  showHeader: true,
  isLoggedIn: false,
  infoUser: null,
  showToast: false,
  toastConfig: {
    message: '',
    color: 'info',
  },
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
    setShowHeader: (state, action) => {
      state.showHeader = action.payload
    },
    setInfoUser: (state, action) => {
      state.infoUser = action.payload
    },
    setSidebarUnfoldable: (state, action) => {
      state.sidebarUnfoldable = action.payload
    },
    setShowToast: (state, action) => {
      state.showToast = action.payload
    },
    setToastConfig: (state, action) => {
      state.toastConfig = action.payload
    },
  },
})

export const {
  setIsLoggedIn,
  setSidebarShow,
  setInfoUser,
  setSidebarUnfoldable,
  setShowToast,
  setToastConfig,
  setShowHeader,
} = appSlice.actions

export default appSlice.reducer
