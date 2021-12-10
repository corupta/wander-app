import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { Routes } from '../../constants'
import { HomeParamList } from '../../types/Navigation'
import AuthNavigator from '../AuthNavigator'
import ScreenBuilder from './config'

const HomeNav = createStackNavigator<HomeParamList>()
export default function HomeNavigator(): JSX.Element {
  return (
    <HomeNav.Navigator screenOptions={ScreenBuilder}>
      <HomeNav.Screen name={Routes.Auth} component={AuthNavigator} />
    </HomeNav.Navigator>
  )
}
