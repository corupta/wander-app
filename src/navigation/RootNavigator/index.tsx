import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { RootParamList } from '../../types/Navigation'
import { Routes } from '../../constants'
import { NotFound } from '../../screens'
import HomeNavigator from '../HomeNavigator'

const Stack = createStackNavigator<RootParamList>()

function RootNavigator(): JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Routes.Home} component={HomeNavigator} />
      <Stack.Screen name={Routes.NotFound} component={NotFound} options={{ title: 'Ooops!' }} />
    </Stack.Navigator>
  )
}

export default RootNavigator
