import { STORE_CONFIG } from 'constants/stores_config';
import { Helmet } from 'react-helmet';

const Head = () => {
    const { WEB_HEAD_DATA } = STORE_CONFIG;
    const { STORE_TITLE, STORE_DESCRIPTION } = WEB_HEAD_DATA;

    return (
        <Helmet>
            <title>{STORE_TITLE}</title>
            <meta name="description" content={STORE_DESCRIPTION} />
        </Helmet>
    );
};

export default Head;
