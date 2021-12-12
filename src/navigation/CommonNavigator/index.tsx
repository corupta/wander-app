import * as React from 'react'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import { Routes } from '../../constants'
import { LeaderBoard, StartMagic } from '../../screens'
import { CommonParamList } from '../../types/Navigation'
import useTheme from '../../contexts/theme'
import { FONT_BOLD } from '../../constants/Theme'
import { FontAwesome } from '@expo/vector-icons'

const CommonStack = createStackNavigator<CommonParamList>()
export default function CommonNavigator({ navigation }: StackScreenProps<CommonParamList>): JSX.Element {
  const { colors } = useTheme()
  return (
    <CommonStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTitleStyle: { color: colors.text, fontSize: 20, fontFamily: FONT_BOLD },
        headerBackImage: () => {
          return <FontAwesome name="chevron-left" size={24} color={colors.text} style={{ paddingLeft: 10 }} />
        },
        headerBackTitleVisible: false,
      }}>
      <CommonStack.Screen options={{ title: 'Leader Board' }} name={Routes.LeaderBoard} component={LeaderBoard} />
      <CommonStack.Screen options={{ title: 'Start Magic' }} name={Routes.StartMagic} component={StartMagic} />
    </CommonStack.Navigator>
  )
}
