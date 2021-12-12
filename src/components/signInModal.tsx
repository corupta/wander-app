import { useNavigation } from '@react-navigation/native'
import React, { FC } from 'react'
import { View, Text, Modal, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { HPView } from '../theme/components'
import useTheme from '../contexts/theme'
import { WebView } from 'react-native-webview'

type IHPModal = {
  isVisible: boolean
  url: string
  onDismiss: () => void
  loginStatus: (status: string) => void
}

const SignInModal: FC<IHPModal> = ({ isVisible, url, onDismiss, loginStatus, ...props }) => {
  const nav = useNavigation()
  const { colors } = useTheme()

  const handleWebViewNavigationStateChange = (props: any) => {
    let lastItem = (props.url || '').split('/')
    lastItem = lastItem[lastItem.length - 1]
    if (lastItem.includes('#access_token=')) {
      loginStatus(lastItem.replace(/^#access_token=+/i, ''))
      return
    }
    // console.log('PROPS', props)
  }

  return (
    <Modal visible={isVisible} style={{ backgroundColor: 'red' }}>
      <SafeAreaView style={styles.container}>
        <HPView variant="background">
          <TouchableOpacity onPress={() => onDismiss()}>
            <AntDesign name="closecircleo" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => loginStatus('TRUE')}>
            <Text>LOGIN</Text>
          </TouchableOpacity>
          <Text>MODAL</Text>
          <WebView
            style={styles.container}
            source={{ uri: 'https://api.wanderapp.cf/oauth/github/' }}
            onNavigationStateChange={handleWebViewNavigationStateChange}
          />
        </HPView>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default SignInModal
