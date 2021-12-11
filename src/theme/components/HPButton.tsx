import React, { FC } from 'react'
import { StyleSheet } from 'react-native'

import { IHPBaseComponentProps } from './types'
import { BorderWidth } from '../layout'
import { SPACING } from '../spacing'
import HPText from './HPText'
import HPPressable from './HPPressable'
import useTheme from '../../contexts/theme'

type Variant = 'filled' | 'outlined'

type Size = 'fullWidth' | 'inline'

type TextColor = 'white' | 'background' | 'text'

interface HPBaseButtonProps extends IHPBaseComponentProps {
  onPress: () => void
  onLongPress?: () => void
  disabled?: boolean
  loading?: boolean
  large?: boolean
}

interface HPPlusButtonProps extends HPBaseButtonProps {
  title?: never
  size?: never
  variant?: never
}

interface HPButtonProps extends HPBaseButtonProps {
  title: string
  plus?: never
  size?: Size
  variant?: Variant
}

const HPButton: FC<HPButtonProps | HPPlusButtonProps> = ({
  title,
  size = 'fullWidth',
  variant = 'filled',
  margin,
  disabled = false,
  loading = false,
  large = false,
  ...props
}) => {
  const { colors } = useTheme()
  const tintColor = disabled ? colors.overlay : variant === 'filled' ? colors.primary : 'transparent'
  const tintBorderColor = disabled ? colors.overlay : variant === 'outlined' ? colors.primary : 'transparent'

  const textColor: {
    filled: Exclude<TextColor, 'text'>
    outlined: Exclude<TextColor, 'background'>
  } = {
    filled: 'background',
    outlined: 'text',
  }
  return (
    <HPPressable
      style={StyleSheet.flatten([
        large ? styles.bigButtonStyle : styles.defaultButtonStyle,
        margin,
        {
          alignSelf: size === 'fullWidth' ? undefined : 'flex-start',
          flex: size === 'fullWidth' ? 1 : undefined,
          backgroundColor: tintColor,
          borderWidth: variant === 'filled' ? 0 : BorderWidth.Bold,
          borderColor: tintBorderColor,
        },
      ])}
      disabled={disabled}
      {...props}>
      <HPText variant="subheader" color={textColor[variant]}>
        {title}
      </HPText>
    </HPPressable>
  )
}
const styles = StyleSheet.create({
  plusButtonStyle: {
    height: 56,
    width: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultButtonStyle: {
    paddingHorizontal: SPACING.DEFAULT,
    flexDirection: 'row',
    maxHeight: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 34,
  },
  bigButtonStyle: {
    paddingHorizontal: SPACING.DEFAULT,
    flexDirection: 'row',
    maxHeight: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
})
export default HPButton
