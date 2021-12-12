import React, { useEffect, useState } from 'react'
import { HPButton, HPDivider, HPLoader, HPText, HPView } from '../../theme/components'
import { useDispatch, useSelector } from 'react-redux'
import { userInformaiton, user } from '../../redux/slices/authSlice'
import { getAllUsers, getProfile } from '../../api'
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import useTheme from '../../contexts/theme'
import { AvatarSize, BorderRadius, IconSize } from '../../theme/layout'
import { spacing, SPACING } from '../../theme/spacing'
import { FontAwesome5 } from '@expo/vector-icons'
import { Routes } from '../../constants'

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
        <HPText
          variant="titleMedium"
          color="overlay"
          alignSelf="center"
          margin={{ marginRight: SPACING.TINY, marginTop: SPACING.TINY }}>
          {index + 1}.
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

const LeaderBoardScreen = ({ navigation }: any) => {
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
      <>
        <View style={[styles.headerContainer, { backgroundColor: colors.overlay }]}>
          <View style={styles.descriptionArea}>
            <View />
            <View>
              <View style={styles.textMask} />
              <View style={styles.textContainer}>
                <HPText color="white" variant="subheader">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit optio, iure vel temporibus
                  animi nisi, dolorem dolores corporis dicta, minus voluptatibus perferendis atque accusantium magni
                  ipsum obcaecati asperiores assumenda voluptatum?
                </HPText>
              </View>
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.startMagic,
                { opacity: pressed ? 0.6 : 1.0, backgroundColor: colors.primary },
              ]}
              onPress={() => navigation.navigate(Routes.MagicList)}>
              <HPText variant="subheader" alignSelf="center" color="white">
                LET'S START THE MAGIC!
              </HPText>
            </Pressable>
          </View>
          <Image
            source={require('../../../assets/images/dumbledore.jpeg')}
            style={styles.dumbledore}
            resizeMode="cover"
          />
        </View>
        <HPText variant="headlineSmall" alignSelf="flex-end" color="overlay" margin={styles.magesList}>
          Leader Mages List ~
        </HPText>
      </>
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
      style={{ backgroundColor: colors.background }}
      data={allUsers}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <HPDivider />}
      keyExtractor={(item, index) => `${item._id}-${index}`}
      ListHeaderComponent={<Header />}
      ListFooterComponent={() => (
        <>
          <HPDivider margin={{ marginBottom: SPACING.MEDIUM }} />
        </>
      )}
    />
  )
}

const styles = StyleSheet.create({
  magesList: {
    marginHorizontal: SPACING.SMALLER,
    marginVertical: SPACING.SMALL,
  },
  headerContainer: {
    height: 350,
    padding: SPACING.SMALLER,
    borderRadius: BorderRadius.Default,
  },
  descriptionArea: {
    zIndex: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 1,
  },
  textMask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.4,
    borderRadius: BorderRadius.Round,
  },
  textContainer: {
    padding: SPACING.SMALL,
  },
  startMagic: {
    padding: SPACING.TINY,
    paddingVertical: SPACING.SMALLER,
    borderRadius: BorderRadius.Round,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dumbledore: {
    height: 350,
    position: 'absolute',
    zIndex: 1,
    opacity: 0.5,
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
  },
})

export default LeaderBoardScreen
