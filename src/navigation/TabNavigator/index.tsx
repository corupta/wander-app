import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { LeaderBoard, Profile, Wand } from '../../screens/index'
import { Routes } from '../../constants'
import { FontAwesome } from '@expo/vector-icons'
import useTheme from '../../contexts/theme'
import { RootTabParamList, RootTabScreenProps } from '../../../types'
import { FONT_BOLD, FONT_REGULAR } from '../../constants/Theme'
import { SPACING } from '../../theme/spacing'
import { IconSize } from '../../theme/layout'
import CommonNavigator from '../CommonNavigator'

const Tab = createBottomTabNavigator<RootTabParamList>()

export function TabNavigator() {
  const { colors } = useTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarStyle: { backgroundColor: colors.background, paddingTop: SPACING.TINY },
        headerStyle: { backgroundColor: colors.background },
        tabBarLabelStyle: { fontSize: 11, fontFamily: FONT_REGULAR },
        headerTitleStyle: { color: colors.text, fontSize: 20, fontFamily: FONT_BOLD },
      }}>
      <Tab.Screen
        name="CommonNavigator"
        component={CommonNavigator}
        options={({ navigation }: RootTabScreenProps<'CommonNavigator'>) => ({
          headerShown: false,
          title: 'Leader Board',
          tabBarIcon: ({ focused }) => <TabBarIcon name="trophy" color={focused ? colors.primary : colors.overlay} />,
        })}
      />
      <Tab.Screen
        name={Routes.ListOfWands}
        component={Wand}
        options={{
          title: 'List Of Wands',
          tabBarIcon: ({ focused }) => <TabBarIcon name="magic" color={focused ? colors.primary : colors.overlay} />,
        }}
      />
      <Tab.Screen
        name={Routes.Profile}
        component={Profile}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon name="user" color={focused ? colors.primary : colors.overlay} />,
        }}
      />
    </Tab.Navigator>
  )
}

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
  return <FontAwesome size={IconSize.Large} style={{ marginBottom: -3 }} {...props} />
}
