import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from './src/contexts/theme'

import useCachedResources from './src/hooks/useCachedResources'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'
import Navigation from './src/navigation'

export default function App() {
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <Provider store={store}>
        <ThemeProvider>
          <Navigation />
        </ThemeProvider>
      </Provider>
    )
  }
}
