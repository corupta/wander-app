import React from 'react'
import { StackScreenProps, StackNavigationOptions } from '@react-navigation/stack'
import { HomeParamList } from '../../types/Navigation'
import { Text } from 'react-native'

const ConfigureOptions = (route: any): { [key: string]: StackNavigationOptions } => ({})

const ScreenBuilder = ({ route }: StackScreenProps<HomeParamList>): StackNavigationOptions => ({
  headerBackTitleVisible: false,
  headerShown: false,
  headerBackImage: () => <Text>TODO HEADER BACK BUTTON</Text>,
  headerTitleAlign: 'center',
  headerTitleStyle: { fontSize: 23 },
  ...ConfigureOptions(route)[route.name],
})

export default ScreenBuilder
