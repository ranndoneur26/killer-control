const GA_MEASUREMENT_ID = 'G-4S5GK6N9CE';

export function enableAnalytics() {
  // GA4 - only loads if user accepted
  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  script.async = true
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  function gtag() { window.dataLayer.push(arguments) }
  gtag('js', new Date())
  gtag('config', GA_MEASUREMENT_ID)
}

export function enableMarketing() {
  // Meta Pixel, etc.
  console.log('Marketing scripts enabled');
}

// Helper to check consent before tracking events
export function hasAnalyticsConsent() {
  const saved = localStorage.getItem('cookie_consent')
  if (!saved) return false
  try {
    return JSON.parse(saved)?.analytics === true
  } catch (e) {
    return false
  }
}
