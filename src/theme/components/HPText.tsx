import React from 'react'
import { Text, TextStyle, TextProps as RNTextProps, TextProps, LayoutChangeEvent, StyleProp } from 'react-native'
import { FONT_REGULAR, FONT_BOLD, ThemeColors } from '../../constants/Theme'
import useTheme from '../../contexts/theme'
import { IHPBaseComponentProps } from './types'

const sizeStyles: { [key: string]: TextStyle } = {
  headlineMedium: { fontSize: 32, lineHeight: 36, fontFamily: FONT_BOLD },
  headlineSmall: { fontSize: 30, lineHeight: 34, fontFamily: FONT_BOLD },
  titleLarge: { fontSize: 28, lineHeight: 32, fontFamily: FONT_REGULAR },
  titleMedium: { fontSize: 24, lineHeight: 28, fontFamily: FONT_REGULAR },
  titleSmall: { fontSize: 20, lineHeight: 24, fontFamily: FONT_REGULAR },
  header: { fontSize: 16, lineHeight: 20, fontFamily: FONT_REGULAR },
  subheader: { fontSize: 14, lineHeight: 20, fontFamily: FONT_REGULAR },
  miscHelper: { fontSize: 12, lineHeight: 16, fontFamily: FONT_REGULAR },
  info: { fontSize: 9, fontFamily: FONT_REGULAR },
  body: { fontSize: 14, lineHeight: 20, fontFamily: FONT_REGULAR },
}
type IHPTextVariant =
  | 'headlineMedium'
  | 'headlineSmall'
  | 'titleLarge'
  | 'titleMedium'
  | 'titleSmall'
  | 'header'
  | 'subheader'
  | 'miscHelper'
  | 'info'
  | 'body'

interface IHPTextProps extends IHPBaseComponentProps {
  color?: ThemeColors
  numberOfLines?: TextProps['numberOfLines']
  adjustsFontSizeToFit?: TextProps['adjustsFontSizeToFit']
  onPress?: () => void
  onLayout?: (e: LayoutChangeEvent) => void
  textDecorationLine?: TextStyle['textDecorationLine']
  variant: IHPTextVariant
  // TODO: Ask if we need these 4 props
  opacity?: number
  position?: 'relative' | 'absolute'
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify'
  alignSelf?: 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'stretch' | 'auto'
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip'
  selectable?: boolean
}

const HPText: React.FC<IHPTextProps> = ({
  color = 'text',
  numberOfLines,
  adjustsFontSizeToFit = false,
  onPress,
  onLayout,
  textDecorationLine = 'none',
  variant = 'titleSmall',
  margin,
  textAlign,
  alignSelf,
  ellipsizeMode = 'tail',
  selectable = false,
  children,
}) => {
  const { colors } = useTheme()
  const baseStyle: TextStyle = {
    fontFamily: sizeStyles[variant].fontFamily,
    fontSize: sizeStyles[variant].fontSize,
    lineHeight: sizeStyles[variant].lineHeight,
    textAlign,
    color: colors[color] ?? colors.text,
    textDecorationLine,
    alignSelf,
    ...margin,
  }

  const styles: Array<StyleProp<TextStyle>> = [baseStyle]
  return (
    <Text
      selectable={selectable}
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      style={styles}
      onPress={onPress}
      onLayout={onLayout}>
      {children}
    </Text>
  )
}

export default HPText
