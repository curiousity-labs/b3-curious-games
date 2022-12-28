import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AppProviders } from './providers'
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProviders>
      <>
        <App />
        <ToastContainer
          position="bottom-center"
          closeButton={false}
          newestOnTop={false}
          pauseOnFocusLoss={false}
        />
      </>
    </AppProviders>
  </React.StrictMode>,
)
