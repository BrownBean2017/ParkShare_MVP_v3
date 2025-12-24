
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log("Entry point index.tsx started loading...");

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("ParkShare application mounted successfully.");
  } catch (error) {
    console.error("Critical error during application mount:", error);
    container.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; text-align: center; flex-direction: column; font-family: sans-serif;">
        <h1 style="color: #ef4444;">Failed to load application</h1>
        <p style="color: #64748b;">There was a technical error starting the app. Please try refreshing.</p>
        <pre style="background: #f1f5f9; padding: 15px; border-radius: 8px; font-size: 12px; margin-top: 20px; max-width: 100%; overflow: auto;">${error instanceof Error ? error.message : String(error)}</pre>
      </div>
    `;
  }
} else {
  console.error("Target container #root not found in the DOM.");
}
