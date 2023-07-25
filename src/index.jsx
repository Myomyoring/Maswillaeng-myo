import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
// import ProvideAuth from './auth/ProvideAuth.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   {/* <ProvideAuth> */}
    <App />
    {/* </ProvideAuth>  */}
  </React.StrictMode>
)