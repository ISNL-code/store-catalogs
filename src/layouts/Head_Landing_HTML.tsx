import { useEffect, useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';

declare global {
    interface Window {
        dataLayer: any[];
    }
}

const Head_Landing_HTML: React.FC = () => {
    const [manifestUrl, setManifestUrl] = useState('');

    const createManifest = () => {
        const manifest = {
            short_name: 'Sales Nest',
            name: 'Create Sales Nest Sample',
            icons: [
                {
                    src: require('assets/img/logo.png'),
                    sizes: '64x64 32x32 24x24 16x16',
                    type: 'image/x-icon',
                },
                {
                    src: require('assets/img/logo.png'),
                    type: 'image/png',
                    sizes: '192x192',
                    purpose: 'maskable',
                },
                {
                    src: require('assets/img/logo.png'),
                    type: 'image/png',
                    sizes: '192x192',
                    purpose: 'any',
                },
                {
                    src: require('assets/img/logo.png'),
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
    }, []); // eslint-disable-line

    return (
        <HelmetProvider>
            <Helmet>
                <html lang="en" />
                <meta name="theme-color" content="#000000" />
                <title>Sales Nest</title>
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

export default Head_Landing_HTML;
