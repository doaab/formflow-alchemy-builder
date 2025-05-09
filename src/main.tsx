
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create a custom event for language changes
const root = createRoot(document.getElementById("root")!);
root.render(<App />);
