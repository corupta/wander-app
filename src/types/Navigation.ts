import { Routes } from '../constants'

export type RootParamList = {
  [Routes.Home]: undefined
  [Routes.NotFound]: undefined
  [Routes.TabNavigator]: undefined
  [Routes.InformationModal]: undefined
}
export type HomeParamList = {
  [Routes.Auth]: undefined
}

export type AuthParamList = {
  [Routes.Welcome]: undefined
}

export type CommonParamList = {
  [Routes.LeaderBoard]: undefined
  [Routes.MagicList]: undefined
  [Routes.StartMagic]: {
    _id: string
    title: string
    description: string
    image: string
  }
  [Routes.InformationModal]: undefined
}
