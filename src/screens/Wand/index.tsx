import React, { useEffect, useState } from 'react'
import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile, getWands, selectWand } from '../../api'
import useTheme from '../../contexts/theme'
import { user, userInformaiton } from '../../redux/slices/authSlice'
import { HPDivider, HPLoader, HPText, HPView } from '../../theme/components'
import { BorderRadius } from '../../theme/layout'
import { SPACING } from '../../theme/spacing'

type userLevel = { userLevel: number }
type ItemProps = {
  item: WandData
}

type WandData = {
  _id?: string
  title: string
  image: string
  requiredLevel: number
}
export type WandId = { wandId: string }
const Item = ({ _id, title, image, requiredLevel, userLevel }: WandData & userLevel) => {
  const { colors } = useTheme()
  const dispatch = useDispatch()
  const selectedWandId: any = useSelector(userInformaiton)?.wandId
  const chooseWand = () => {
    const req = {
      wandId: _id,
    } as WandId
    selectWand(req)
      .then((res) => {
        if (res) {
          reFetchProfile()
          return
        }
      })
      .catch((err) => console.log('ERR', err.response.data))
  }

  const reFetchProfile = () => {
    getProfile()
      .then((res) => {
        dispatch(user(res.data))
      })
      .catch((err) => {
        console.log('ERR', err)
      })
  }

  const isDisabled = userLevel < requiredLevel || selectedWandId === _id

  return (
    <>
      <Pressable disabled={isDisabled} style={[styles.itemContainer]} onPress={chooseWand}>
        <Image source={{ uri: image }} style={styles.wandImage} resizeMode="contain" />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignItems: 'center' }}>
          <View style={styles.infoRow}>
            <HPText variant="header" color="text">
              {title}{' '}
            </HPText>
            <HPText variant="subheader" color="text">
              Required Level:{' '}
              <HPText variant="subheader" color="error">
                {requiredLevel}
              </HPText>
            </HPText>
          </View>
          {selectedWandId === _id && (
            <View style={[styles.selectButton, { backgroundColor: colors.error }]}>
              <HPText variant="info" color="white">
                SELECTED
              </HPText>
            </View>
          )}
        </View>
      </Pressable>
      {userLevel < requiredLevel ? (
        <View style={styles.lockedRow}>
          <HPText
            variant="miscHelper"
            color="error"
            alignSelf="flex-start"
            margin={{ marginTop: SPACING.SMALLER, marginLeft: SPACING.MEDIUM }}>
            LOCKED
          </HPText>
        </View>
      ) : null}
    </>
  )
}

const WandScreen = () => {
  const [data, setData] = useState()
  const { colors } = useTheme()
  const userLevel: any = useSelector(userInformaiton)?.level

  useEffect(() => {
    getWands()
      .then((res) => {
        setData(res.data.data)
      })
      .catch((err) => {
        console.log('ERR', err)
      })
  }, [])

  const renderItem = ({ item }: ItemProps) => {
    return (
      <Item
        _id={item._id}
        title={item.title}
        image={item.image}
        requiredLevel={item.requiredLevel}
        userLevel={userLevel}
      />
    )
  }

  if (!data) {
    return (
      <HPView variant="emptyScreen">
        <HPLoader />
      </HPView>
    )
  }
  return (
    <FlatList
      contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}
      style={{ backgroundColor: colors.background }}
      data={data}
      ItemSeparatorComponent={() => <HPDivider />}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item._id}-${index}`}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  itemContainer: {
    height: 80,
    padding: SPACING.SMALLER,
    flexDirection: 'row',
  },
  wandImage: {
    width: 150,
  },
  infoRow: {
    paddingLeft: SPACING.SMALLER,
    flexShrink: 1,
    justifyContent: 'center',
  },
  selectButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.TINY,
    height: 30,
    borderRadius: BorderRadius.Default,
  },
  lockedRow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})

export default WandScreen
