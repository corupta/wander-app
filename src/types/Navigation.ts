import { Routes } from '../constants'

export type RootParamList = {
  [Routes.Home]: undefined
  [Routes.NotFound]: undefined
}
export type HomeParamList = {
  [Routes.Auth]: undefined
}

export type AuthParamList = {
  [Routes.Welcome]: undefined
}
