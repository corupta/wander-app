import React from 'react'
import { ThemeProvider } from './src/contexts/theme'

import { Provider } from 'react-redux'
import { store, persistor } from './src/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import Navigation from './src/navigation'
import { useFonts } from 'expo-font'
import { FONT_REGULAR, FONT_BOLD, FONT_ITALIC } from './src/constants/Theme'

export default function App() {
  const [loaded] = useFonts({
    [FONT_REGULAR]: require('./assets/fonts/SpaceMonoRegular.ttf'),
    [FONT_BOLD]: require('./assets/fonts/SpaceMonoBold.ttf'),
    [FONT_ITALIC]: require('./assets/fonts/SpaceMonoItalic.ttf'),
  })

  if (!loaded) {
    return null
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <Navigation />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    )
  }
}
