import React, { useState } from 'react'
import { View, Modal, Text, StyleSheet, Pressable, Image } from 'react-native'
import { HPButton, HPDivider, HPText, HPView } from '../../theme/components'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { spellCheck } from '../../api'
import { Routes } from '../../constants'
import { user, UserType } from '../../redux/slices/authSlice'
import { SPACING } from '../../theme/spacing'
import { CommonParamList } from '../../types/Navigation'
import { FontAwesome } from '@expo/vector-icons'

type StartMagicScreenRouteProp = RouteProp<CommonParamList, Routes.StartMagic>
type StartMagicScreenProp = StackNavigationProp<CommonParamList, Routes.StartMagic>

type StackScreenProps = {
  navigation: StartMagicScreenProp
  route: StartMagicScreenRouteProp
}

type Response = {
  isSimilar: boolean
  levelUp: boolean
  user: UserType
}

const InfoModal = ({ isVisible, setModalVisible }: { isVisible: boolean; setModalVisible: any }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Wrong Magic!</Text>
          <Text style={styles.modalText}>Try Again</Text>
          <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!isVisible)}>
            <Text style={styles.textStyle}>
              CLOSE {'  '}
              <FontAwesome name="magic" size={16} color="white" />
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

const StartMagicScreen = ({ navigation, route }: StackScreenProps): JSX.Element => {
  const { _id, title, description, image } = route.params
  const [letsStart, setLetsStart] = useState<boolean>(true)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const dispatch = useDispatch()

  const spellResults = async (points: any) => {
    const req = {
      spellId: _id,
      points: points,
    }
    try {
      const res = await spellCheck(req)
      if (res) {
        const resultData: Response = res.data.data
        if (resultData.isSimilar) {
          dispatch(user)
          navigation.goBack()
          return
        }
        setIsVisible(true)
        setLetsStart(true)
      }
    } catch (err) {
      console.log('ERR', err)
    }
  }
  return (
    <HPView variant="background">
      <HPText variant="header">Magic Name: {title}</HPText>
      <HPDivider margin={{ marginVertical: SPACING.SMALLER }} />
      <View style={styles.sectionContainer}>
        <HPText variant="body" margin={{ marginBottom: SPACING.TINY }}>
          Expected Magic
        </HPText>
        <Image source={{ uri: image }} style={{ aspectRatio: 3 / 1 }} resizeMode="contain" />
        <View />
      </View>
      <HPDivider margin={{ marginBottom: SPACING.SMALLER }} />
      <View style={styles.sectionContainer}>
        <HPText variant="body" margin={{ marginBottom: SPACING.TINY }}>
          Your Magic
        </HPText>
        <Image source={{ uri: image }} style={{ aspectRatio: 3 / 1 }} resizeMode="contain" />
        <View />
      </View>
      {letsStart && (
        <View style={{ position: 'absolute', bottom: SPACING.MEDIUM, left: SPACING.SMALLER, right: SPACING.SMALLER }}>
          <HPButton variant="filled" title="Start Magic" onPress={() => setLetsStart(false)} />
        </View>
      )}
      {isVisible && <InfoModal isVisible={isVisible} setModalVisible={setIsVisible} />}
    </HPView>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  sectionContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
})

export default StartMagicScreen
