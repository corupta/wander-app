export enum Theme {
  Dark = 'dark',
  Light = 'light',
}

export const palette = {
  primary: 'rgb(71, 186, 124)',
  black: 'rgb(0, 0, 0)',
  white: 'rgb(255, 255, 255)',
} as const

// If system default is undefined and user hasn't saved any preferences yet
export const DEFAULT_THEME = Theme.Light

type ThemeMap = Record<Theme, { colors: { [key: string]: string } }>

export const themeConstants: ThemeMap = {
  [Theme.Light]: {
    colors: {
      primary: palette.primary,
      background: palette.white,
      text: palette.black,
    },
  },
  [Theme.Dark]: {
    colors: {
      primary: palette.primary,
      background: palette.black,
      text: palette.white,
    },
  },
}
