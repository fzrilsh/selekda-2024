import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UseAuthProvider } from './hooks/useAuth.jsx'

//styling
import './assets/style.css'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter>
      <UseAuthProvider>
        <Navbar />
        <App />
        <Footer />
      </UseAuthProvider>
    </BrowserRouter>
  // </StrictMode>,
)
