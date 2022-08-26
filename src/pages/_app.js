import { Provider } from 'react-redux'
import { persistor, store } from '../app/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider as AuthProvider } from 'next-auth/client'
import '../styles/globals.css'
const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </AuthProvider>
  )
}

export default MyApp
