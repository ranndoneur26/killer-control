import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { enableAnalytics, enableMarketing } from '../lib/analytics'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  
  // Default preferences: necessary is always true
  const [prefs, setPrefs] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    const saved = localStorage.getItem('cookie_consent')
    if (!saved) {
      setVisible(true) // Only show if no saved decision
    } else {
      // If saved, ensure scripts run on subsequent visits
      try {
        const consent = JSON.parse(saved)
        if (consent.analytics) enableAnalytics()
        if (consent.marketing) enableMarketing()
      } catch (e) {
        // invalid JSON, reset
        setVisible(true)
      }
    }
  }, [])

  const saveConsent = (consent) => {
    localStorage.setItem('cookie_consent', JSON.stringify(consent))
    localStorage.setItem('cookie_consent_date', new Date().toISOString())
    setVisible(false)
    
    // Activate scripts based on consent
    if (consent.analytics) enableAnalytics()
    if (consent.marketing) enableMarketing()
  }

  const acceptAll = () => saveConsent({ necessary: true, analytics: true, marketing: true })
  const rejectAll = () => saveConsent({ necessary: true, analytics: false, marketing: false })
  const saveCustom = () => saveConsent(prefs)

  if (!visible) return null

  return (
    <div className="cookie-banner fixed bottom-0 left-0 right-0 z-50 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg">
      <div className="cookie-banner__content max-w-4xl mx-auto flex flex-col gap-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Usamos cookies propias y de terceros para analizar el uso de la web
          y mejorar tu experiencia. Puedes aceptar todas o configurarlas.{' '}
          <Link to="/privacidad" className="text-indigo-600 hover:text-indigo-500 underline">Política de cookies</Link>
        </p>

        {showDetails && (
          <div className="cookie-banner__details grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
            <label className="flex items-center gap-2 cursor-pointer opacity-75">
              <input type="checkbox" checked disabled className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500" />
              <span className="text-sm font-medium">Necesarias <span className="text-xs text-gray-500 block font-normal">Siempre activas</span></span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={prefs.analytics}
                onChange={e => setPrefs(p => ({ ...p, analytics: e.target.checked }))}
                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
              />
              <span className="text-sm font-medium">Analítica <span className="text-xs text-gray-500 block font-normal">Mejorar la app</span></span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={prefs.marketing}
                onChange={e => setPrefs(p => ({ ...p, marketing: e.target.checked }))}
                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
              />
              <span className="text-sm font-medium">Marketing <span className="text-xs text-gray-500 block font-normal">Publicidad personalizada</span></span>
            </label>
          </div>
        )}

        <div className="cookie-banner__actions flex flex-wrap gap-3 justify-end">
          <button onClick={rejectAll} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
            Rechazar todas
          </button>
          <button onClick={() => setShowDetails(!showDetails)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
            {showDetails ? 'Ocultar opciones' : 'Personalizar'}
          </button>
          {showDetails ? (
            <button onClick={saveCustom} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Guardar preferencias
            </button>
          ) : (
            <button onClick={acceptAll} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Aceptar todas
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
