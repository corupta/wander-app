import React, { useEffect, useState } from 'react'
import { HPDivider, HPLoader, HPText, HPView } from '../../theme/components'
import { useDispatch, useSelector } from 'react-redux'
import { userInformaiton, user } from '../../redux/slices/authSlice'
import { getAllUsers, getProfile } from '../../api'
import { FlatList, Image, View } from 'react-native'
import useTheme from '../../contexts/theme'
import { AvatarSize, BorderRadius, IconSize } from '../../theme/layout'
import { SPACING } from '../../theme/spacing'
import { FontAwesome5 } from '@expo/vector-icons'

type ItemProps = {
  __v?: number
  _id?: string
  avatar: string
  createdAt?: Date
  email: any
  githubId?: string
  level: number
  name: string
  updatedAt?: Date
}

const Item = ({ name, avatar, level, index }: { name: string; avatar: string; level: number; index: number }) => {
  return (
    <View
      style={{
        padding: SPACING.SMALLER,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <HPText variant="titleMedium" color="overlay" alignSelf="center" margin={{ marginRight: SPACING.TINY }}>
          {index + 1}-)
        </HPText>
        <Image
          source={{ uri: avatar }}
          style={{ height: AvatarSize.Small, width: AvatarSize.Small, borderRadius: BorderRadius.Rounder }}
        />
        <HPText variant="titleSmall" color="text" margin={{ marginLeft: SPACING.SMALLER }}>
          {name} {index === 0 && <FontAwesome5 name="award" size={IconSize.Medium} color="grey" />}
        </HPText>
      </View>
      <HPText variant="subheader">
        Level:{' '}
        <HPText variant="subheader" color="error">
          {level}
        </HPText>
      </HPText>
    </View>
  )
}

const LeaderBoardScreen = () => {
  const [allUsers, setAllUsers] = useState()
  const userInfo = useSelector(userInformaiton)
  const dispatch = useDispatch()
  const { colors } = useTheme()

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
    getAllUsers()
      .then((res) => {
        const filteredData = res.data.data.sort((a: ItemProps, b: ItemProps) => {
          return a.level - b.level
        })
        setAllUsers(filteredData)
      })
      .catch((err) => {
        console.log('ERR', err)
      })
  }, [])

  const renderItem = ({ item, index }: { item: ItemProps; index: number }) => {
    return <Item name={item.name} avatar={item.avatar} level={item.level} index={index} />
  }

  const Header = () => {
    return (
      <HPText
        variant="headlineSmall"
        alignSelf="flex-end"
        color="overlay"
        margin={{ marginHorizontal: SPACING.SMALLER, marginVertical: SPACING.SMALL }}>
        Leader Mages List ~
      </HPText>
    )
  }
  if (!userInfo && !allUsers) {
    return (
      <HPView variant="emptyScreen">
        <HPLoader size="large" />
      </HPView>
    )
  }
  return (
    <FlatList
      contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.background }}
      data={allUsers}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <HPDivider />}
      keyExtractor={(item, index) => `${item._id}-${index}`}
      ListHeaderComponent={<Header />}
    />
  )
}

export default LeaderBoardScreen
