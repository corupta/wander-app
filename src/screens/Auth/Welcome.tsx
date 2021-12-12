import React, { FC, useState } from 'react'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Routes } from '../../constants'
import { AuthParamList, HomeParamList } from '../../types/Navigation'
import { HPText, HPButton } from '../../theme/components'
import { SPACING } from '../../theme/spacing'
import HPView from '../../theme/components/HPView'
import SignInModal from '../../components/signInModal'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/slices/authSlice'
import { Entypo } from '@expo/vector-icons'
import { StyleSheet, View } from 'react-native'

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
  const [signInModal, setSignInModal] = useState(false)
  const dispatch = useDispatch()

  const loginStatus = (status: string) => {
    setSignInModal(false)
    dispatch(login(status))
  }

  return (
    <HPView variant="background" style={{ justifyContent: 'space-between' }}>
      <HPText variant="header" color="text" margin={{ marginVertical: SPACING.LARGE }} alignSelf="center">
        Welcome Magician ~
      </HPText>
      <View style={styles.center}>
        <Entypo name="flash" size={100} color="#213232" />
      </View>
      <HPButton
        large
        variant="outlined"
        size="fullWidth"
        title="LOGIN WITH GITHUB"
        onPress={() => setSignInModal(true)}
      />
      <HPText variant="miscHelper" color="text" alignSelf="flex-end" margin={{ marginVertical: SPACING.LARGE }}>
        there's magic inside
      </HPText>

      {signInModal && (
        <SignInModal
          isVisible={signInModal}
          url="https://api.wanderapp.cf/oauth/github/"
          onDismiss={() => setSignInModal(false)}
          loginStatus={loginStatus}
        />
      )}
    </HPView>
  )
}

const styles = StyleSheet.create({
  center: { alignItems: 'center' },
})

export default WelcomeScreen
