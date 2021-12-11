import React, { createContext, useMemo } from 'react'
import { useColorScheme } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { DEFAULT_THEME, Theme, themeConstants } from '../constants/Theme'
import { changeTheme, selectTheme } from '../redux/slices/preferencesSlice'

type ThemeContext = {
  selectedTheme?: Theme // This can be null to use system default
  activeTheme: Theme // Loaded theme based on user preference or system default or fallback
  changeTheme: (theme: Theme) => void
} & typeof themeConstants[Theme.Dark]

const Context = createContext<ThemeContext | null>(null)

export const ThemeProvider: React.FC = ({ children }) => {
  const selectedTheme = useSelector(selectTheme)
  const dispatch = useDispatch()
  const systemColorScheme = useColorScheme()

  const themeValues = useMemo(() => {
    const activeTheme = ((selectedTheme === null ? systemColorScheme : selectedTheme) ?? DEFAULT_THEME) as Theme

    const value: ThemeContext = {
      activeTheme,
      selectedTheme,
      changeTheme: (theme: Theme) => dispatch(changeTheme(theme)),
      ...themeConstants[activeTheme],
    }
    return value
  }, [selectedTheme, systemColorScheme])

  return <Context.Provider value={themeValues}>{children}</Context.Provider>
}

const useTheme = () => React.useContext(Context) as ThemeContext

export default useTheme
