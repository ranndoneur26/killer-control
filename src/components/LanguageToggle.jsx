'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function LanguageToggle() {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();

    const toggleLanguage = () => {
        const newLocale = currentLocale === 'es' ? 'en' : 'es';
        // Reemplaza el segmento de locale en la ruta actual
        const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
        router.push(newPath || `/${newLocale}`);
        // localStorage.setItem('preferred-locale', newLocale); // next-intl handles this via cookie by default usually
    };

    return (
        <button
            onClick={toggleLanguage}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-150 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
        >
            {currentLocale === 'es' ? '🇬🇧 EN' : '🇪🇸 ES'}
        </button>
    );
}
