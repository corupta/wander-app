export enum Theme {
  Dark = 'dark',
  Light = 'light',
}

export const palette = {
  primary: 'rgb(71, 186, 124)',
  black: 'rgb(0, 0, 0)',
  white: 'rgb(255, 255, 255)',
  error: 'rgb(240, 55, 56)',
  blackOverlay: 'rgba(0, 0, 0, 0.2)',
  whiteOverlay: 'rgba(255, 255, 255, 0.2)',
} as const

// If system default is undefined and user hasn't saved any preferences yet
export const DEFAULT_THEME = Theme.Light

export type ThemeColors = 'primary' | 'background' | 'text' | 'error' | 'overlay' | 'white'
type ThemeMap = Record<Theme, { colors: { [key: string]: string } }>

export const FONT_REGULAR = 'SpaceMonoRegular'
export const FONT_BOLD = 'SpaceMonoBold'
export const FONT_ITALIC = 'SpaceMonoItalic'

export const themeConstants = {
  [Theme.Light]: {
    colors: {
      primary: palette.primary,
      background: palette.white,
      text: palette.black,
      error: palette.error,
      overlay: palette.blackOverlay,
      white: palette.white,
    },
  },
  [Theme.Dark]: {
    colors: {
      primary: palette.primary,
      background: palette.black,
      text: palette.white,
      error: palette.error,
      overlay: palette.whiteOverlay,
      white: palette.white,
    },
  },
}
