import { STORE_CONFIG } from 'constants/stores_config';
import { Helmet } from 'react-helmet';

declare global {
    interface Window {
        dataLayer: any[]; // Предполагается, что dataLayer - это массив
    }
}

const Head: React.FC = () => {
    const { WEB_HEAD_DATA } = STORE_CONFIG;
    const { STORE_TITLE, STORE_DESCRIPTION, GOOGLE_ANALYTICS_ID } = WEB_HEAD_DATA;
    console.log(GOOGLE_ANALYTICS_ID);
    return (
        <Helmet>
            <title>{STORE_TITLE}</title>
            <meta name="description" content={STORE_DESCRIPTION} />
            <script async src={`https://www.googletagmanager.com/gtag/js?id=G-${GOOGLE_ANALYTICS_ID}`}></script>
            <script>
                {`function gtag(){dataLayer.push(arguments)}window.dataLayer=window.dataLayer||[],gtag("js",new Date),gtag("config","G-${GOOGLE_ANALYTICS_ID}")`}
            </script>
        </Helmet>
    );
};

export default Head;
