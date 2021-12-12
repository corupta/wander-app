import React, { FC } from 'react'
import { ViewStyle, StyleSheet, View } from 'react-native'

import useTheme from '../../contexts/theme'
import { IHPBaseComponentProps } from './types'

interface IHPDividerProps extends IHPBaseComponentProps {
  color?: string
}

const HPDivider: FC<IHPDividerProps> = ({ margin, color }) => {
  const { colors } = useTheme()

  const style: ViewStyle = {
    backgroundColor: color ?? colors.divider,
    ...margin,
  }

  return <View style={StyleSheet.flatten([styles.divider, style])} />
}

export default HPDivider

const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
  },
})
