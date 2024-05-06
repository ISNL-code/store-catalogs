import { STORE_CONFIG } from 'constants/stores_config';
import { Helmet } from 'react-helmet';

declare global {
    interface Window {
        dataLayer: any[];
    }
}

const Head: React.FC = () => {
    const { WEB_HEAD_DATA } = STORE_CONFIG;
    const { STORE_TITLE, STORE_DESCRIPTION, GOOGLE_ANALYTICS_ID, STORE_LOGO } = WEB_HEAD_DATA;
    return (
        <Helmet>
            <title>{STORE_TITLE}</title>
            <meta name="description" content={STORE_DESCRIPTION} />
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}></script>
            <script>
                {`function gtag(){dataLayer.push(arguments)}window.dataLayer=window.dataLayer||[],gtag("js",new Date),gtag("config","${GOOGLE_ANALYTICS_ID}")`}
            </script>
            <link rel="icon" href={require(`dataBase/images/logos/${STORE_LOGO}`)} />
            {/* <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" /> */}
        </Helmet>
    );
};

export default Head;
