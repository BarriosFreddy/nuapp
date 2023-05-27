import { setShowToast, setToastConfig } from 'src/app.slice'

export const sendToast = (dispatch, { message, color = 'success', delay = 2000 }) => {
  if (!message) console.error('Toast notification must have a message')
  dispatch(
    setToastConfig({
      message,
      color,
      delay,
    }),
  )
  dispatch(setShowToast(true))
}
