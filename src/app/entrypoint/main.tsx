import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RootPage } from '@/pages/RootPage'

const root = document.getElementById('root')!

createRoot(root).render(
  <StrictMode>
    <RootPage />
  </StrictMode>,
)
