import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { RootParamList } from '../../types/Navigation'
import { Routes } from '../../constants'
import { NotFound } from '../../screens'
import HomeNavigator from '../HomeNavigator'
import { TabNavigator } from '../TabNavigator'

const Stack = createStackNavigator<RootParamList>()

function RootNavigator(): JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={Routes.TabNavigator}>
      <Stack.Screen name={Routes.Home} component={HomeNavigator} />
      <Stack.Screen name={Routes.TabNavigator} component={TabNavigator} />
      <Stack.Screen name={Routes.NotFound} component={NotFound} options={{ title: 'Ooops!' }} />
    </Stack.Navigator>
  )
}

export default RootNavigator
