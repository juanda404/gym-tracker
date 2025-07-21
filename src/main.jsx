import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { supabase } from './supabase/client.js' 

createRoot(document.getElementById('root')).render(
    <SessionContextProvider supabaseClient={supabase}>
        <App />
    </SessionContextProvider>
)
