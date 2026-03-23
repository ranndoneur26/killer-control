import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../../index.css';
import { AppearanceProvider } from '../../contexts/AppearanceContext';

export default async function LocaleLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <head>
                <title>Killer Control - Control your subscriptions</title>
            </head>
            <body>
                <NextIntlClientProvider messages={messages}>
                    <AppearanceProvider>
                        <div className="min-h-screen bg-transparent">
                            {children}
                        </div>
                    </AppearanceProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
