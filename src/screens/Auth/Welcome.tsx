import React, { FC } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Routes } from '../../constants'
import { AuthParamList, HomeParamList } from '../../types/Navigation'
import useTheme from '../../contexts/theme'
import { useDispatch } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { changeTheme } from '../../redux/slices/preferencesSlice'
import { Theme } from '../../constants/Theme'

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
  const { colors, selectedTheme } = useTheme()
  const dispatch = useDispatch()

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={{ color: colors.text }}>Welcome Screen</Text>
      {[Theme.Light, Theme.Dark, null].map((theme) => (
        <TouchableOpacity
          key={theme}
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => dispatch(changeTheme(theme))}>
          <Text style={{ color: colors.text }}>
            {theme ?? 'system default'}
            {selectedTheme === theme && ' active'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 20,
  },
})

export default WelcomeScreen
