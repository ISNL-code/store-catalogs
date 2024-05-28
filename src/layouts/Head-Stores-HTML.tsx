import React, { useEffect, useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { STORE_CONFIG } from 'store_constants/stores_config';

declare global {
    interface Window {
        dataLayer: any[];
    }
}

const HeadStoresHTML: React.FC = () => {
    const { WEB_HEAD_DATA, STORE_NAME, HTML_LANG } = STORE_CONFIG;
    const { STORE_TITLE, STORE_DESCRIPTION, GOOGLE_ANALYTICS_ID, STORE_LOGO } = WEB_HEAD_DATA;

    // Используем useState для хранения URL манифеста
    const [manifestUrl, setManifestUrl] = useState('');

    // Функция для создания манифеста динамически
    const createManifest = () => {
        const manifest = {
            short_name: STORE_NAME,
            name: `Create ${STORE_NAME} sample`,
            icons: [
                {
                    src: require(`dataBase/images/logos/${STORE_LOGO}`),
                    sizes: '64x64 32x32 24x24 16x16',
                    type: 'image/x-icon',
                },
                {
                    src: require(`dataBase/images/logos/${STORE_LOGO}`),
                    type: 'image/png',
                    sizes: '192x192',
                    purpose: 'maskable',
                },
                {
                    src: require(`dataBase/images/logos/${STORE_LOGO}`),
                    type: 'image/png',
                    sizes: '192x192',
                    purpose: 'any',
                },
                {
                    src: require(`dataBase/images/logos/${STORE_LOGO}`),
                    type: 'image/png',
                    sizes: '512x512',
                },
            ],
            start_url: '/',
            display: 'standalone',
            theme_color: '#ffffff',
            background_color: '#ffffff',
        };

        const manifestJSON = JSON.stringify(manifest);
        const blob = new Blob([manifestJSON], { type: 'application/json' });
        const manifestURL = URL.createObjectURL(blob);
        setManifestUrl(manifestURL);
    };

    useEffect(() => {
        createManifest();
    }, [STORE_LOGO]); // eslint-disable-line

    return (
        <HelmetProvider>
            <Helmet>
                <html lang={HTML_LANG} />
                <meta name="theme-color" content="#ffffff" />
                <title>{STORE_TITLE}</title>
                <meta name="description" content={STORE_DESCRIPTION} />
                <link rel="icon" href={`/dataBase/images/logos/${STORE_LOGO}`} />
                <link rel="apple-touch-icon" href={`/dataBase/images/logos/${STORE_LOGO}`} />
                <link rel="manifest" href={manifestUrl} />
                <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}></script>
                <script>
                    {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag() {
                        dataLayer.push(arguments);
                    }
                    gtag('js', new Date());
                    gtag('config', '${GOOGLE_ANALYTICS_ID}');
                    `}
                </script>
            </Helmet>
        </HelmetProvider>
    );
};

export default HeadStoresHTML;
