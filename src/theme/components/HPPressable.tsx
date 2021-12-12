import React, { FC } from 'react'
import { Pressable, PressableProps, ViewStyle } from 'react-native'

interface IHPPressableProps extends PressableProps {
  style?: ViewStyle | ViewStyle[]

  /**
   * Controls whether pressable opacity is enabled or not.
   * When set to true **opacity** will be 0.65; 1 otherwise.
   *
   * @default false
   */
  opaque?: boolean
}

const HP_OPACITY = 0.65
const FULL_OPACITY = 1

//  TODO: Restrict props
const HPPressable: FC<IHPPressableProps> = ({ style, children, opaque = false, ...restProps }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        style,
        {
          opacity: !opaque && pressed ? HP_OPACITY : FULL_OPACITY,
        },
      ]}
      {...restProps}>
      {children}
    </Pressable>
  )
}

export default HPPressable
