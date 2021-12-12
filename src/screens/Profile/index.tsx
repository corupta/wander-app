import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { userInformaiton } from '../../redux/slices/authSlice'
import { HPButton, HPDivider, HPText, HPView } from '../../theme/components'
import { AvatarSize, BorderRadius } from '../../theme/layout'
import { SPACING } from '../../theme/spacing'

const ProfileScreen = () => {
  const user = useSelector(userInformaiton)
  const dispatch = useDispatch()
  return (
    <HPView variant="background">
      <View style={styles.avatarRow}>
        <Image source={{ uri: user?.avatar }} style={styles.avatar} />
      </View>
      <HPText variant="titleSmall" color="text" alignSelf="center" margin={{ marginTop: SPACING.SMALL }}>
        {user?.name}
      </HPText>
      <HPDivider margin={{ marginVertical: SPACING.SMALL }} />
      <HPText variant="subheader" alignSelf="center">
        Magic Level: {user?.level}
      </HPText>
      <View style={styles.logoutButtonRow}>
        <HPButton variant="outlined" title="LOGOUT" onPress={() => dispatch({ type: 'LOGOUT' })} />
      </View>
    </HPView>
  )
}

const styles = StyleSheet.create({
  avatarRow: {
    alignItems: 'center',
  },
  avatar: {
    height: AvatarSize.Larger,
    width: AvatarSize.Larger,
    borderRadius: BorderRadius.Rounder,
  },
  logoutButtonRow: {
    position: 'absolute',
    bottom: SPACING.MEDIUM,
    left: SPACING.SMALL,
    right: SPACING.SMALL,
  },
})
export default ProfileScreen
