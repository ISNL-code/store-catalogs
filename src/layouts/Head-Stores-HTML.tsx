import React, { useEffect, useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { STORE_CONFIG } from 'store_constants/stores_config';

declare global {
    interface Window {
        dataLayer: any[];
    }
}

const HeadStoresHTML: React.FC = () => {
    const { WEB_HEAD_DATA, STORE_NAME, HTML_LANG } = STORE_CONFIG; // eslint-disable-line

    const {
        STORE_TITLE, // eslint-disable-line
        STORE_DESCRIPTION, // eslint-disable-line
        GOOGLE_ANALYTICS_ID,
        GOOGLE_ADS_ID,
        STORE_LOGO,
        STORE_POSTER, // eslint-disable-line
        KEYWORDS,
    } = WEB_HEAD_DATA; // eslint-disable-line

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
        const metaTag = document.querySelector('meta[property="og:image"]');
        if (metaTag) {
            metaTag.setAttribute('content', `/dataBase/images/posters/${STORE_POSTER}`);
        } else {
            const newMetaTag = document.createElement('meta');
            newMetaTag.setAttribute('property', 'og:image');
            newMetaTag.setAttribute('content', `/dataBase/images/posters/${STORE_POSTER}`);
            document.head.appendChild(newMetaTag);
        }

        const twitterMetaTag = document.querySelector('meta[name="twitter:image"]');
        if (twitterMetaTag) {
            twitterMetaTag.setAttribute('content', `/dataBase/images/posters/${STORE_POSTER}`);
        } else {
            const newTwitterMetaTag = document.createElement('meta');
            newTwitterMetaTag.setAttribute('name', 'twitter:image');
            newTwitterMetaTag.setAttribute('content', `/dataBase/images/posters/${STORE_POSTER}`);
            document.head.appendChild(newTwitterMetaTag);
        }
    }, [STORE_POSTER]);

    useEffect(() => {
        createManifest();
    }, [STORE_LOGO]); // eslint-disable-line

    useEffect(() => {
        if (!manifestUrl) return;

        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker
                    .register('/serviceWorker.js', { scope: '/' })
                    .then(reg => {
                        console.log('registered serviceWorker');
                    })
                    .catch(err => {
                        console.log(err);
                    });
            });
        }
    }, [manifestUrl]);

    useEffect(() => {
        const google_analytics = () => {
            const script = document.createElement('script');
            script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`;
            script.async = true;
            document.head.appendChild(script);

            const configScript = document.createElement('script');
            configScript.innerHTML = `
                window.dataLayer = window.dataLayer || [];
                function gtag() {
                    dataLayer.push(arguments);
                }
                gtag("js", new Date());
                gtag("config", "${GOOGLE_ANALYTICS_ID}");
            `;
            document.head.appendChild(configScript);
        };

        google_analytics();

        const ads_analytics = () => {
            const script = document.createElement('script');
            script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
            script.async = true;
            document.head.appendChild(script);

            const configScript = document.createElement('script');
            configScript.innerHTML = `
                window.dataLayer = window.dataLayer || [];
                function gtag() {
                    dataLayer.push(arguments);
                }
                gtag("js", new Date());
                gtag("config", "${GOOGLE_ADS_ID}");
            `;
            document.head.appendChild(configScript);
        };

        ads_analytics();
    }, [GOOGLE_ANALYTICS_ID]); // eslint-disable-line

    const allKeywords = Object.values(KEYWORDS).join(' | '); // eslint-disable-line

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
                <meta property="og:description" content={STORE_DESCRIPTION} />
                <meta name="twitter:title" content={STORE_TITLE} />
                <meta name="twitter:description" content={STORE_DESCRIPTION} />
                <link rel="manifest" href={manifestUrl} />
            </Helmet>
        </HelmetProvider>
    );
};

export default HeadStoresHTML;
