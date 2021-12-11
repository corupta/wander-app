import { StyleSheet, Dimensions } from 'react-native'

export enum BorderRadius {
  Default = 6,
  Round = 10,
  Rounder = 50,
}

export enum AvatarSize {
  Smaller = 32,
  Small = 40,
  Medium = 48,
  Large = 64,
  Larger = 90,
}

export enum IconSize {
  Micro = 12,
  Small = 16,
  Medium = 20,
  Default = 24,
  Large = 28,
  Logo = 40,
}

export enum BorderWidth {
  Default = StyleSheet.hairlineWidth,
  Bold = 1,
  Bolder,
}

export enum InputHeight {
  Small = 34,
  Default = 42,
}

export enum HeaderButtonHeight {
  Default = 34,
}

export const TabBarHeight = 52
export const ScreenWidth = Dimensions.get('window').width
