import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Routes } from '../../constants'
import { HPText, HPView } from '../../theme/components'
import { CommonParamList, HomeParamList } from '../../types/Navigation'

type StartMagicScreenRouteProp = RouteProp<CommonParamList, Routes.StartMagic>
type StartMagicScreenProp = StackNavigationProp<CommonParamList, Routes.StartMagic>

type StackScreenProps = {
  navigation: StartMagicScreenProp
  route: StartMagicScreenRouteProp
}

const StartMagicScreen = ({ navigation, route }: StackScreenProps): JSX.Element => {
  const { _id, title, description, image } = route.params
  return (
    <HPView variant="background">
      <HPText variant="body">{title}</HPText>
    </HPView>
  )
}

export default StartMagicScreen
