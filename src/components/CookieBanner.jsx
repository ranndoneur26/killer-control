import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X, ChevronDown, ChevronUp } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { enableAnalytics, enableMarketing } from '../lib/analytics'

export default function CookieBanner({ onOpenPolicy }) {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const [prefs, setPrefs] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    const saved = localStorage.getItem('killer_cookie_consent')
    if (!saved) {
      // Show after a small delay for better UX
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    } else {
      try {
        const consent = JSON.parse(saved)
        if (consent.analytics) enableAnalytics()
        if (consent.marketing) enableMarketing()
      } catch (e) {
        setVisible(true)
      }
    }
  }, [])

  const saveConsent = (consent) => {
    localStorage.setItem('killer_cookie_consent', JSON.stringify(consent))
    localStorage.setItem('killer_cookie_consent_date', new Date().toISOString())
    setVisible(false)

    if (consent.analytics) enableAnalytics()
    if (consent.marketing) enableMarketing()
  }

  const acceptAll = () => saveConsent({ necessary: true, analytics: true, marketing: true })
  const rejectAll = () => saveConsent({ necessary: true, analytics: false, marketing: false })
  const saveCustom = () => saveConsent(prefs)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 flex justify-center pointer-events-none"
        >
          <div className="bg-[#0F172A] text-white p-6 md:p-8 rounded-[2.5rem] shadow-2xl max-w-3xl w-full border border-white/10 pointer-events-auto overflow-hidden">
            <div className="flex flex-col gap-6">
              {/* Header */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-[#F59E0B]/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Cookie size={24} className="text-[#F59E0B]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-xl mb-2 tracking-tight">{t('cookies_banner.title')}</h3>
                  <p className="text-[#94A3B8] text-sm leading-relaxed max-w-xl">
                    {t('cookies_banner.description')}
                  </p>
                </div>
                <button
                  onClick={() => setVisible(false)}
                  className="text-[#94A3B8] hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Advanced Options */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    key="cookie-details-panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-white/5 rounded-3xl p-5 border border-white/5"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex flex-col gap-1 opacity-70">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" checked disabled className="w-4 h-4 rounded border-white/20 bg-transparent text-[#4F46E5]" />
                          <span className="text-sm font-bold">{t('cookies_banner.necessary_label')}</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-[#64748B] ml-6">{t('cookies_banner.necessary_desc')}</span>
                      </div>

                      <label className="flex flex-col gap-1 cursor-pointer group">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={prefs.analytics}
                            onChange={e => setPrefs(p => ({ ...p, analytics: e.target.checked }))}
                            className="w-4 h-4 rounded border-white/20 bg-transparent text-[#4F46E5] focus:ring-0 focus:ring-offset-0"
                          />
                          <span className="text-sm font-bold group-hover:text-[#4F46E5] transition-colors">{t('cookies_banner.analytics_label')}</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-[#64748B] ml-6">{t('cookies_banner.analytics_desc')}</span>
                      </label>

                      <label className="flex flex-col gap-1 cursor-pointer group">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={prefs.marketing}
                            onChange={e => setPrefs(p => ({ ...p, marketing: e.target.checked }))}
                            className="w-4 h-4 rounded border-white/20 bg-transparent text-[#4F46E5] focus:ring-0 focus:ring-offset-0"
                          />
                          <span className="text-sm font-bold group-hover:text-[#4F46E5] transition-colors">{t('cookies_banner.marketing_label')}</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-[#64748B] ml-6">{t('cookies_banner.marketing_desc')}</span>
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/5">
                <div className="flex items-center gap-4 order-2 sm:order-1">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#94A3B8] hover:text-white transition-colors"
                  >
                    {showDetails ? <><ChevronUp size={14} /> {t('cookies_banner.hide_options')}</> : <><ChevronDown size={14} /> {t('cookies_banner.customize')}</>}
                  </button>
                  <Link
                    to="/privacidad"
                    className="text-xs font-black uppercase tracking-widest text-[#4F46E5] hover:text-[#6366F1] transition-colors"
                  >
                    {t('cookies_banner.policy_link')}
                  </Link>
                </div>

                <div className="flex gap-3 w-full sm:w-auto order-1 sm:order-2">
                  <button
                    onClick={rejectAll}
                    className="flex-1 sm:flex-none px-6 py-3 rounded-2xl border border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/5 transition-all active:scale-95"
                  >
                    {t('cookies_banner.reject_all')}
                  </button>
                  <button
                    onClick={showDetails ? saveCustom : acceptAll}
                    className="flex-1 sm:flex-none px-8 py-3 rounded-2xl bg-[#4F46E5] text-xs font-black uppercase tracking-widest hover:bg-[#4338CA] transition-all active:scale-95 shadow-xl shadow-indigo-500/20"
                  >
                    {showDetails ? t('cookies_banner.save_prefs') : t('cookies_banner.accept_all')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
