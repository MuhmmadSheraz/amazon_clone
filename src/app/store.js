import { combineReducers, configureStore } from '@reduxjs/toolkit'
import basketReducer from '../slices/basketSlice'
import productsReducer from '../slices/productsSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
}

const reducers = combineReducers({
  basket: basketReducer,
  products: productsReducer,
})
const persistedReducer = persistReducer(persistConfig, reducers)
export const store = configureStore({
  reducer: persistedReducer,
})
export const persistor = persistStore(store)
