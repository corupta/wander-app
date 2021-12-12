import { configureStore, combineReducers, ThunkAction, Action, AnyAction, getDefaultMiddleware } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

import AsyncStorage from '@react-native-async-storage/async-storage'
import preferencesReducer from './slices/preferencesSlice'
import authReducer from './slices/authSlice'

const appReducer = combineReducers({
  preferences: preferencesReducer,
  auth: authReducer,
})

const rootReducer = (state: AppState | undefined, action: AnyAction) => {
  if (action.type === 'LOGOUT') {
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['preferences', 'auth'],
  // whitelist: ['preferences'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof appReducer>
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
