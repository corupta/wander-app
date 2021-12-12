import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootNavigator from './RootNavigator'
import useTheme from '../contexts/theme'
import { StatusBar } from 'react-native'
import { Theme } from '../constants/Theme'

export default function Navigation(): JSX.Element {
  const { activeTheme } = useTheme()

  return (
    <>
      <StatusBar barStyle={activeTheme === Theme.Dark ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </>
  )
}
