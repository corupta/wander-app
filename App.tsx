import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from './src/contexts/theme'

import useCachedResources from './src/hooks/useCachedResources'
import { Provider } from 'react-redux'
import { store, persistor } from './src/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import Navigation from './src/navigation'
import Sensors from './src/screens/Sensors3'

export default function App() {
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <Sensors />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    )
  }
}
