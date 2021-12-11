import { createSlice } from '@reduxjs/toolkit'
import { Theme } from '../../constants/Theme'
import { RootState } from '../store'

export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: {
    theme: null,
  },
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload
    },
  },
})

export const { changeTheme } = preferencesSlice.actions
export const selectTheme = (state: RootState): Theme => state.preferences.theme

export default preferencesSlice.reducer
