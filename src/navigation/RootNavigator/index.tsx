import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { RootParamList } from '../../types/Navigation'
import { Routes } from '../../constants'
import { NotFound } from '../../screens'
import HomeNavigator from '../HomeNavigator'
import { TabNavigator } from '../TabNavigator'
import { authToken, user } from '../../redux/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getProfile } from '../../api'

const Stack = createStackNavigator<RootParamList>()

function RootNavigator(): JSX.Element {
  const token = useSelector(authToken)
  const dispatch = useDispatch()
  useEffect(() => {
    if (token) {
      getProfile()
        .then((res) => {
          dispatch(user(res.data))
        })
        .catch((err) => {
          console.log('ERR', err)
        })
    }
  }, [token])

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={Boolean(token) ? Routes.TabNavigator : Routes.Home}>
      {Boolean(token) ? (
        <Stack.Screen name={Routes.TabNavigator} component={TabNavigator} />
      ) : (
        <Stack.Screen name={Routes.Home} component={HomeNavigator} />
      )}

      <Stack.Screen name={Routes.NotFound} component={NotFound} options={{ title: 'Ooops!' }} />
    </Stack.Navigator>
  )
}

export default RootNavigator
