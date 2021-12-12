import React from 'react'
import { HPLoader, HPText, HPView } from '../../theme/components'
import { useSelector } from 'react-redux'
import { userInformaiton } from '../../redux/slices/authSlice'

const LeaderBoardScreen = () => {
  const user = useSelector(userInformaiton)

  if (!user) {
    return (
      <HPView variant="emptyScreen">
        <HPLoader size="large" />
      </HPView>
    )
  }
  return (
    <HPView variant="background">
      <HPText variant="titleSmall" color="text">
        HOME
      </HPText>
    </HPView>
  )
}

export default LeaderBoardScreen
