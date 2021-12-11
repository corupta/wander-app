import React, { createContext, useMemo } from 'react'
import { useColorScheme } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { DEFAULT_THEME, Theme, themeConstants } from '../constants/Theme'
import { changeTheme, selectTheme } from '../redux/slices/preferencesSlice'

type ThemeContext = {
  activeTheme: Theme
  changeTheme: (theme: Theme) => void
} & typeof themeConstants[Theme.Dark]

const Context = createContext<ThemeContext | null>(null)

export const ThemeProvider: React.FC = ({ children }) => {
  const activeTheme = useSelector(selectTheme)
  const dispatch = useDispatch()
  const systemColorScheme = useColorScheme()

  const themeValues = useMemo(() => {
    const loadedTheme = ((activeTheme === null ? systemColorScheme : activeTheme) ?? DEFAULT_THEME) as Theme

    const value: ThemeContext = {
      activeTheme,
      changeTheme: (theme: Theme) => dispatch(changeTheme(theme)),
      ...themeConstants[loadedTheme],
    }
    return value
  }, [activeTheme, systemColorScheme])

  return <Context.Provider value={themeValues}>{children}</Context.Provider>
}

const useTheme = () => React.useContext(Context) as ThemeContext

export default useTheme
