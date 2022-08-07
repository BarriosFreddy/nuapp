import { createSlice } from '@reduxjs/toolkit'

const todosSlice = createSlice({
  name: 'items',
  initialState: [],
  reducers: {
    itemAdded(state, action) {
      state.push({
        id: action.payload.id,
        text: action.payload.text,
        completed: false
      })
    },
    getItem(state, action) {
      const todo = state.find(todo => todo.id === action.payload)
      todo.completed = !todo.completed
    }
  }
})

export const { todoAdded, todoToggled } = todosSlice.actions
export default todosSlice.reducer