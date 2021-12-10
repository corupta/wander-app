export enum Theme {
  Auto,
  Dark = 'dark',
  Light = 'light',
}

export const DEFAULT_THEME = Theme.Light

const tintColorLight = '#2f95dc'
const tintColorDark = '#fff'

export const themeConstants = {
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
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
}
