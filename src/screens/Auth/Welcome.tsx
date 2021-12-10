import React, { FC } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Routes } from '../../constants'
import { AuthParamList, HomeParamList } from '../../types/Navigation'

type WelcomeScreenRouteProp = RouteProp<AuthParamList, Routes.Welcome>

type WelcomeScreenProp = CompositeNavigationProp<
  StackNavigationProp<AuthParamList, Routes.Welcome>,
  StackNavigationProp<HomeParamList>
>
type StackScreenProps = {
  navigation: WelcomeScreenProp
  route?: WelcomeScreenRouteProp
}

const WelcomeScreen: FC<StackScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Welcome Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default WelcomeScreen
