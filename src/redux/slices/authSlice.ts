import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    user: {},
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload
    },
    user: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { login, user } = authSlice.actions
export const authToken = (state: RootState) => state.auth.token
export const userInformaiton = (state: RootState) => state.auth.user

export default authSlice.reducer
