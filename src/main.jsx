// Diagnostic: catch module-level errors
const root = document.getElementById('root');

async function boot() {
  try {
    root.innerHTML = '<p style="font-family:monospace;padding:1rem">Loading...</p>';
    const { StrictMode, Component } = await import('react');
    const { createRoot } = await import('react-dom/client');
    await import('./index.css');
    const { default: App } = await import('./App.jsx');
    createRoot(root).render(
      <StrictMode><App /></StrictMode>
    );
  } catch (err) {
    root.innerHTML = `<div style="font-family:monospace;padding:2rem;background:#fee;color:#c00;white-space:pre-wrap;word-break:break-word">
      <h2>Module Error</h2>
      <p>${err.message}</p>
      <pre>${err.stack}</pre>
    </div>`;
  }
}

boot();
