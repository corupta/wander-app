import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Image, View } from 'react-native'
import { useSelector } from 'react-redux'
import { getSpells } from '../../api'
import useTheme from '../../contexts/theme'
import { userInformaiton } from '../../redux/slices/authSlice'
import { HPDivider, HPLoader, HPText, HPView } from '../../theme/components'
import { SPACING } from '../../theme/spacing'
import { useNavigation } from '@react-navigation/native'
import { Routes } from '../../constants'
import { StackNavigationProp } from '@react-navigation/stack'
import { CommonParamList } from '../../types/Navigation'
import { FontAwesome } from '@expo/vector-icons'

type ItemProps = {
  __v?: number
  _id: string
  createdAt?: Date
  description: string
  image: string
  requiredLevel: number
  title: string
  updatedAt?: Date
}
const Item = ({
  _id,
  title,
  description,
  image,
  requiredLevel,
}: {
  _id: string
  title: string
  description: string
  image: string
  requiredLevel: number
}) => {
  const userLevel: any = useSelector(userInformaiton)?.level
  const { colors } = useTheme()
  const navigation = useNavigation<StackNavigationProp<CommonParamList>>()
  const disabled = userLevel < requiredLevel
  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [styles.itemContainer, { opacity: pressed ? 0.6 : 1.0 }]}
      onPress={() => navigation.navigate(Routes.StartMagic, { title, description, image, _id })}>
      <Image source={{ uri: image }} style={styles.spellImage} resizeMode="contain" />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignItems: 'center' }}>
        <View style={styles.infoRow}>
          <HPText variant="header" color="text">
            {title}{' '}
          </HPText>
          <HPText variant="info" margin={{ marginVertical: SPACING.SMALLER }}>
            {description}
          </HPText>
          <HPText variant="subheader" color="text">
            Required Level:{' '}
            <HPText variant="subheader" color="error">
              {requiredLevel}
            </HPText>
          </HPText>
        </View>
      </View>
      {disabled && (
        <View style={styles.lockedRow}>
          <FontAwesome
            name="lock"
            size={24}
            color={colors.text}
            style={{ marginTop: SPACING.SMALLER, marginLeft: SPACING.DEFAULT }}
          />
        </View>
      )}
    </Pressable>
  )
}
const MagicListScreen = () => {
  useFocusEffect(
    useCallback(() => {
      getAllMagic()
    }, []),
  )
  const [spells, setSpells] = useState<ItemProps[] | undefined>()
  const { colors } = useTheme()

  const getAllMagic = async () => {
    try {
      const res = await getSpells()
      if (res) {
        setSpells(res.data.data)
      }
    } catch (err) {
      console.log('ERR', err)
    }
  }

  const renderItem = ({ item }: { item: ItemProps }) => {
    return (
      <Item
        _id={item._id}
        title={item.title}
        description={item.description}
        image={item.image}
        requiredLevel={item.requiredLevel}
      />
    )
  }
  if (!spells) {
    return (
      <HPView variant="emptyScreen">
        <HPLoader size="large" color="text" />
      </HPView>
    )
  }
  return (
    <FlatList
      contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}
      style={{ backgroundColor: colors.background }}
      data={spells}
      ItemSeparatorComponent={() => <HPDivider />}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item?._id}-${index}`}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  itemContainer: {
    padding: SPACING.SMALLER,
    flexDirection: 'row',
    paddingVertical: SPACING.HUGE,
  },
  spellImage: {
    width: 150,
  },
  infoRow: {
    paddingLeft: SPACING.SMALLER,
    flexShrink: 1,
    justifyContent: 'center',
  },
  lockedRow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})

export default MagicListScreen
