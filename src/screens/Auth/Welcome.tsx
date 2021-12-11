import React, { FC } from 'react'
import { Text, View, StyleSheet, Alert } from 'react-native'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Routes } from '../../constants'
import { AuthParamList, HomeParamList } from '../../types/Navigation'
import useTheme from '../../contexts/theme'
import { useDispatch } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { changeTheme } from '../../redux/slices/preferencesSlice'
import { Theme } from '../../constants/Theme'
import { HPText, HPButton, HPDivider } from '../../theme/components'
import { SPACING } from '../../theme/spacing'
import HPView from '../../theme/components/HPView'

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
    <HPView variant="background">
      <HPText variant="header" color="text" margin={{ marginVertical: SPACING.LARGE }} alignSelf="center">
        Welcome Screen
      </HPText>

      <HPButton large variant="outlined" size="fullWidth" title="LOGIN" onPress={() => console.log('HARRY POTTER')} />
      <HPText variant="subheader" color="text" margin={{ marginVertical: SPACING.LARGE }}>
        Harry Potter
      </HPText>
      <HPDivider />
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
    </HPView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.MASSIVE,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 20,
  },
})

export default WelcomeScreen
