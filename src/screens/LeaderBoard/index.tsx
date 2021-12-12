import React, { useEffect } from 'react'
import { HPLoader, HPText, HPView } from '../../theme/components'
import { useDispatch, useSelector } from 'react-redux'
import { userInformaiton, user } from '../../redux/slices/authSlice'
import { getProfile } from '../../api'

const LeaderBoardScreen = () => {
  const userInfo = useSelector(userInformaiton)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!userInfo) {
      getProfile()
        .then((res) => {
          dispatch(user(res.data))
        })
        .catch((err) => {
          console.log('ERR', err)
        })
    }
  }, [])
  if (!userInfo) {
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
