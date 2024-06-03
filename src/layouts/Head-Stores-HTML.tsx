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
    const { STORE_TITLE, STORE_DESCRIPTION, GOOGLE_ANALYTICS_ID, STORE_LOGO, STORE_POSTER, KEYWORDS } = WEB_HEAD_DATA;

    const [manifestUrl, setManifestUrl] = useState('');

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
            start_url: window.location.origin,
            display: 'standalone',
            theme_color: '#000',
            background_color: '#000',
        };

        const manifestJSON = JSON.stringify(manifest);
        const blob = new Blob([manifestJSON], { type: 'application/json' });
        const manifestURL = URL.createObjectURL(blob);
        setManifestUrl(manifestURL);
    };

    useEffect(() => {
        createManifest();
    }, [STORE_LOGO]); // eslint-disable-line

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                const swPath = '/serviceWorker.js';
                fetch(swPath)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`ServiceWorker fetch failed with status: ${response.status}`);
                        }
                        return response.blob();
                    })
                    .then(blob => {
                        if (blob.type !== 'application/javascript') {
                            throw new Error(`Unsupported MIME type: ${blob.type}`);
                        }
                        navigator.serviceWorker
                            .register(swPath)
                            .then(reg => {
                                console.log('Worker Registered', reg);
                            })
                            .catch(err => {
                                console.error('Error in service worker registration:', err);
                            });
                    })
                    .catch(err => {
                        console.error('Service worker fetch error:', err);
                    });
            });
        }
    }, []); // eslint-disable-line

    const allKeywords = Object.values(KEYWORDS).join(' | ');

    return (
        <HelmetProvider>
            <Helmet>
                <html lang={HTML_LANG} translate="no" />
                <title>{STORE_TITLE}</title>
                <meta name="description" content={STORE_DESCRIPTION} />
                <meta name="keywords" content={allKeywords} />
                <link rel="canonical" href={window.location.href} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:site_name" content={STORE_NAME} />
                <meta property="og:title" content={STORE_TITLE} />
                <meta property="og:image" content={require(`dataBase/images/posters/${STORE_POSTER}`)} />
                <meta property="og:description" content={STORE_DESCRIPTION} />
                <meta name="twitter:title" content={STORE_TITLE} />
                <meta name="twitter:description" content={STORE_DESCRIPTION} />
                <meta name="twitter:image" content={require(`dataBase/images/posters/${STORE_POSTER}`)} />
                <link rel="icon" href={require(`dataBase/images/logos/${STORE_LOGO}`)} />
                <link rel="apple-touch-icon" href={require(`dataBase/images/logos/${STORE_LOGO}`)} />
                <link rel="manifest" href={manifestUrl} />
                {Array.isArray(GOOGLE_ANALYTICS_ID) ? (
                    GOOGLE_ANALYTICS_ID.map((id, index) => (
                        <React.Fragment key={index}>
                            <script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`}></script>
                            <script>
                                {`
                                    window.dataLayer = window.dataLayer || [];
                                    function gtag() {
                                        dataLayer.push(arguments);
                                    }
                                    gtag('js', new Date());
                                    gtag('config', '${id}');
                                `}
                            </script>
                        </React.Fragment>
                    ))
                ) : (
                    <>
                        <script
                            async
                            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
                        ></script>
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
                    </>
                )}
            </Helmet>
        </HelmetProvider>
    );
};

export default HeadStoresHTML;
