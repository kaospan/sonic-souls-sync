import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

async function bootstrap() {
  if (import.meta.env.DEV || import.meta.env.VITE_USE_MOCK === 'true') {
    const { initMockServer } = await import('./lib/mockServer')
    await initMockServer()
  }
  createRoot(document.getElementById("root")!).render(<App />)
}

bootstrap()
