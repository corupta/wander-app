import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Routes } from '../../constants'
import { Welcome } from '../../screens'
import { AuthParamList } from '../../types/Navigation'

const AuthNav = createStackNavigator<AuthParamList>()

const AuthNavigator = (): JSX.Element => {
  return (
    <AuthNav.Navigator screenOptions={{ headerShown: false }}>
      <AuthNav.Screen name={Routes.Welcome} component={Welcome} />
    </AuthNav.Navigator>
  )
}

export default AuthNavigator
