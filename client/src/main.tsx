import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { store } from './core/store/store'
import { Provider } from 'react-redux'
import './index.css'
import LocaleProvider from './providers/LocaleProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <LocaleProvider>
        <App />
      </LocaleProvider>
    </Provider>
  </React.StrictMode>
)
