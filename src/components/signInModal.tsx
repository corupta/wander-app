import { useNavigation } from '@react-navigation/native'
import React, { FC, useState } from 'react'
import { View, Modal, SafeAreaView, Pressable, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { HPLoader } from '../theme/components'
import useTheme from '../contexts/theme'
import { WebView } from 'react-native-webview'
import { SPACING } from '../theme/spacing'

type IHPModal = {
  isVisible: boolean
  url: string
  onDismiss: () => void
  loginStatus: (status: string) => void
}

const SignInModal: FC<IHPModal> = ({ isVisible, url, onDismiss, loginStatus, ...props }) => {
  const nav = useNavigation()
  const { colors } = useTheme()
  const [spinner, setSpinner] = useState<boolean>(true)

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
    <Modal visible={isVisible}>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.container}>
          <Pressable style={styles.closeButton} onPress={() => onDismiss()}>
            <AntDesign name="closecircleo" size={24} color={colors.text} />
          </Pressable>

          <WebView
            onLoad={() => setSpinner(false)}
            style={styles.webView}
            source={{ uri: 'https://api.wanderapp.cf/oauth/github/' }}
            onNavigationStateChange={handleWebViewNavigationStateChange}
          />
          {spinner && (
            <View style={[styles.spinner, { backgroundColor: colors.background }]}>
              <HPLoader size="large" color="text" />
            </View>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
  spinner: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    zIndex: 2,
    padding: SPACING.SMALL,
    right: 0,
  },
})

export default SignInModal
