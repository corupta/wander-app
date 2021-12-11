export enum Theme {
  Dark = 'dark',
  Light = 'light',
}

const tintColorLight = '#2f95dc'
const tintColorDark = '#fff'

// If system default is undefined and user hasn't saved any preferences yet
export const DEFAULT_THEME = Theme.Light

type ThemeMap = Record<Theme, { colors: { [key: string]: string } }>

export const themeConstants: ThemeMap = {
  [Theme.Light]: {
    colors: {
      text: '#000',
      background: '#fff',
      tint: tintColorLight,
      tabIconDefault: '#ccc',
      tabIconSelected: tintColorLight,
    },
  },
  [Theme.Dark]: {
    colors: {
      text: '#fff',
      background: '#000',
      tint: tintColorDark,
      tabIconDefault: '#ccc',
      tabIconSelected: tintColorDark,
    },
  },
}
