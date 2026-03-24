import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageToggle() {
    const { locale, setLocale } = useLanguage();

    const toggleLanguage = () => {
        const newLocale = locale === 'es' ? 'en' : 'es';
        setLocale(newLocale);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="bg-gray-100/50 hover:bg-gray-200/50 text-gray-700 border border-gray-200/50 rounded-lg px-3 py-1.5 text-sm font-bold transition-all duration-150 dark:bg-gray-800/50 dark:hover:bg-gray-700/50 dark:text-gray-200 dark:border-gray-600/50 backdrop-blur-sm"
        >
            {locale === 'es' ? '🇪🇸 ES' : '🇬🇧 EN'}
        </button>
    );
}
