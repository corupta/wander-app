import React, { FC } from 'react'
import { ActivityIndicator } from 'react-native'

import useTheme from '../../contexts/theme'
import { ThemeColors } from '../../constants/Theme'
import { IHPBaseComponentProps } from './types'

interface IHPLoaderProps extends IHPBaseComponentProps {
  color?: ThemeColors
  size?: 'large' | 'small'
}

const IHPLoader: FC<IHPLoaderProps> = ({ margin, size = 'small', color = 'text' }) => {
  const { colors } = useTheme()

  return <ActivityIndicator size={size} color={colors[color]} style={margin} />
}

export default IHPLoader
