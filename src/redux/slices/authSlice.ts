import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

type User = {
  __v: number
  __id: string
  avatar: string
  createdAt: Date | number
  email: any
  githubId: string
  level: number
  name: string
  updatedAt: Date | number
} | null
type Token = string

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '' as Token,
    user: null as User,
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
