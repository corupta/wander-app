import React, { useEffect, useState } from 'react'
import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { getWands } from '../../api'
import useTheme from '../../contexts/theme'
import { userInformaiton } from '../../redux/slices/authSlice'
import { HPDivider, HPLoader, HPText, HPView } from '../../theme/components'
import { SPACING } from '../../theme/spacing'

type userLevel = { userLevel: number }
type ItemProps = {
  item: WandData
}

type WandData = {
  __id?: string
  title: string
  image: string
  requiredLevel: number
}
const Item = ({ title, image, requiredLevel, userLevel }: WandData & userLevel) => {
  return (
    <>
      <Pressable
        disabled={userLevel < requiredLevel}
        style={[styles.itemContainer]}
        onPress={() => console.log('TODO SELECT WAND')}>
        <Image source={{ uri: image }} style={styles.wandImage} resizeMode="contain" />
        <View style={styles.infoRow}>
          <HPText variant="header" color="text">
            {title}
          </HPText>
          <HPText variant="subheader" color="text">
            Required Level:{' '}
            <HPText variant="subheader" color="error">
              {requiredLevel}
            </HPText>
          </HPText>
        </View>
      </Pressable>
      {userLevel < requiredLevel ? (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}>
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
    return <Item title={item.title} image={item.image} requiredLevel={item.requiredLevel} userLevel={userLevel} />
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
      data={data}
      ItemSeparatorComponent={() => <HPDivider />}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.__id}-${index}`}
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
})

export default WandScreen
