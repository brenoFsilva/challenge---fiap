import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './pages/Home.tsx'
import Sidebar from './components/Sidebar/Sidebar.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Sidebar></Sidebar>
     <BrowserRouter>
       <Routes>
      <Route path="/" element={<App />} />
       <Route path="/Home" element={<Home />} />
      </Routes>
     </BrowserRouter>
    
  </StrictMode>,
)
