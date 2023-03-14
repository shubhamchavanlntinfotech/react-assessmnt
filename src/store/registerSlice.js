import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
}

export const registerSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    registerUser: (state, action) => ({ ...state, users: [...state.users, action.payload] }),
  },
})

export const { registerUser } = registerSlice.actions

export default registerSlice.reducer