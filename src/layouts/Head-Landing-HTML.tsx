import { useEffect, useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';

declare global {
    interface Window {
        dataLayer: any[];
    }
}

const HeadLandingHTML: React.FC = () => {
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
                <meta
                    name="description"
                    content="Online product catalog is a powerful software solution for creating and managing electronic catalogs. Convenient addition and classification of products, product visualization for online stores and exhibitions. | Онлайн каталог товаров – мощное программное решение для создания и управления электронными каталогами. Удобное добавление и классификация товаров, визуализация продукции для интернет-магазинов и выставок. | Онлайн каталог товарів – потужне програмне рішення для створення та керування електронними каталогами. Зручне додавання та класифікація товарів, візуалізація продукції для інтернет-магазинів та виставок."
                />
                <meta property="og:title" content="Sales Nest Online Catalog | Заказать онлайн каталог товаров" />
                <meta
                    property="og:description"
                    content="Online product catalog is a powerful software solution for creating and managing electronic catalogs. Convenient addition and classification of products, product visualization for online stores and exhibitions. | Онлайн каталог товаров – мощное программное решение для создания и управления электронными каталогами. Удобное добавление и классификация товаров, визуализация продукции для интернет-магазинов и выставок. | Онлайн каталог товарів – потужне програмне рішення для створення та керування електронними каталогами. Зручне додавання та класифікація товарів, візуалізація продукції для інтернет-магазинів та виставок."
                />
                <link rel="icon" href={require('assets/img/logo.png')} />
                <link rel="apple-touch-icon" href={require('assets/img/logo.png')} />
                <link rel="manifest" href={manifestUrl} />
                <meta
                    name="keywords"
                    content="интернет-каталог товаров, создание электронных каталогов, описание товаров, добавление товаров, классификация товаров, online product catalog, electronic catalog creation, product descriptions, product listing, product classification, інтернет-каталог товарів, створення електронних каталогів, опис товарів, додавання товарів, класифікація товарів"
                />
                <link rel="canonical" href="https://salesnestonlinecatalog.com" />

                {/* Google analytics TAG */}
                <script async src={`https://www.googletagmanager.com/gtag/js?id=G-5EKVQYRR8P`}></script>
                <script>
                    {`function gtag(){dataLayer.push(arguments)}window.dataLayer=window.dataLayer||[],gtag("js",new Date),gtag("config","G-5EKVQYRR8P")`}
                </script>

                {/* Event snippet for Покупка conversion page */}
                <script>
                    {`gtag('event', 'conversion', {
                        send_to: 'AW-16532045891/BjdfCLir_qYZEMOAjMs9',
                        value: 1.0,
                        currency: 'UAH',
                        transaction_id: '',
                    });`}
                </script>

                {/* Function to report conversions */}
                <script>
                    {`function gtag_report_conversion(url) {
                        var callback = function () {
                            if (typeof url != 'undefined') {
                                window.location = url;
                            }
                        };
                        gtag('event', 'conversion', {
                            send_to: 'AW-16532045891/BjdfCLir_qYZEMOAjMs9',
                            value: 1.0,
                            currency: 'UAH',
                            transaction_id: '',
                            event_callback: callback,
                        });
                        return false;
                    }`}
                </script>
            </Helmet>
        </HelmetProvider>
    );
};

export default HeadLandingHTML;
