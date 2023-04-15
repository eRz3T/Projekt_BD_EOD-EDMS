import './App.css'
import Router from './core/router/Routes'
import { SnackbarProvider } from 'notistack'
import { AuthProvider } from './providers/AuthProvider'

function App() {
  return (
    <>
      <SnackbarProvider autoHideDuration={3750}>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </SnackbarProvider>
    </>
  )
}

export default App
