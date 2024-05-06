import { STORE_CONFIG } from 'constants/stores_config';
import { useEffect, useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';

declare global {
    interface Window {
        dataLayer: any[];
    }
}

const Head: React.FC = () => {
    const { WEB_HEAD_DATA, STORE_NAME } = STORE_CONFIG;
    const { STORE_TITLE, STORE_DESCRIPTION, GOOGLE_ANALYTICS_ID, STORE_LOGO } = WEB_HEAD_DATA;

    // Используем useState для хранения данных манифеста
    const [manifestUrl, setManifestUrl] = useState('');

    // Функция для создания манифеста динамически
    const createManifest = () => {
        const manifest = {
            short_name: STORE_NAME,
            name: 'Create Catalog Sample',
            icons: [
                {
                    src: `dataBase/images/logos/${STORE_LOGO}`,
                    sizes: '64x64 32x32 24x24 16x16',
                    type: 'image/x-icon',
                },
                {
                    src: `dataBase/images/logos/${STORE_LOGO}`,
                    type: 'image/png',
                    sizes: '192x192',
                    purpose: 'maskable',
                },
                {
                    src: `dataBase/images/logos/${STORE_LOGO}`,
                    type: 'image/png',
                    sizes: '192x192',
                    purpose: 'any',
                },
                {
                    src: `dataBase/images/logos/${STORE_LOGO}`,
                    type: 'image/png',
                    sizes: '512x512',
                },
            ],
            start_url: '.',
            display: 'standalone',
            theme_color: '#000000',
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
                <meta name="theme-color" content="#000000" />
                <title>{STORE_TITLE}</title>
                <meta name="description" content={STORE_DESCRIPTION} />
                <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}></script>
                <script>
                    {`function gtag(){dataLayer.push(arguments)}window.dataLayer=window.dataLayer||[],gtag("js",new Date),gtag("config","${GOOGLE_ANALYTICS_ID}")`}
                </script>
                <link rel="icon" href={require(`dataBase/images/logos/${STORE_LOGO}`)} />
                <link rel="apple-touch-icon" href={require(`dataBase/images/logos/${STORE_LOGO}`)} />
                <link rel="manifest" href={manifestUrl} />
            </Helmet>
        </HelmetProvider>
    );
};

export default Head;
