import * as React from 'react'
import { HPDivider, HPText, HPView } from '../../theme/components'
import { SPACING } from '../../theme/spacing'

export default function ModalScreen() {
  return (
    <HPView variant="background">
      <HPText variant="headlineMedium">Magic Information</HPText>
      <HPDivider margin={{ marginVertical: SPACING.MEDIUM }} />
      <HPText variant="header">GeneralMagic Description</HPText>
    </HPView>
  )
}
