/* eslint-disable react-native/no-unused-styles */
import React, { FC } from 'react'
import { ViewStyle, View, StyleSheet, ViewProps } from 'react-native'
import useTheme from '../../contexts/theme'
import { SPACING } from '../spacing'

interface IHPViewStyle extends ViewStyle {
  backgroundColor: any
}

interface IHPExileBGStyle extends ViewStyle {
  backgroundColor?: never
}

interface IHPVariantStyle {
  background?: IHPViewStyle
  emptyScreen?: IHPViewStyle
}

interface IHPViewStyleProps extends ViewProps {
  variant?: never
  style: IHPViewStyle | (IHPViewStyle | ViewStyle)[]
}

interface IHPViewVariantProps extends ViewProps {
  variant: 'background' | 'emptyScreen'
  style?: IHPExileBGStyle | IHPExileBGStyle[]
}

const HPView: FC<IHPViewStyleProps | IHPViewVariantProps> = ({
  variant = 'background',
  style,
  children,
  ...restProps
}) => {
  const { colors } = useTheme()

  const themedStyles: IHPVariantStyle = {
    background: {
      backgroundColor: colors.background,
    },
    emptyScreen: {
      backgroundColor: colors.background,
    },
  }

  return (
    <View {...restProps} style={StyleSheet.flatten([staticStyles[variant], themedStyles[variant], style])}>
      {children}
    </View>
  )
}

const staticStyles = StyleSheet.create({
  background: {
    flex: 1,
    padding: SPACING.DEFAULT,
  },
  emptyScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.DEFAULT,
  },
})

export default HPView
