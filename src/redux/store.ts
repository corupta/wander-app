import { configureStore, combineReducers, ThunkAction, Action, AnyAction } from '@reduxjs/toolkit'

const appReducer = combineReducers({})

const rootReducer = (state: AppState | undefined, action: AnyAction) => {
  if (action.type === 'USER_LOGOUT') {
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}

export const store = configureStore({
  reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof appReducer>
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
