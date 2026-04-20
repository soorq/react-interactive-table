import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RootPage } from '@/pages/RootPage';
import { ThemeProvider } from '../providers/theme';

const root = document.getElementById('root')!;

createRoot(root).render(
  <StrictMode>
    <ThemeProvider>
      <RootPage />
    </ThemeProvider>
  </StrictMode>,
);
