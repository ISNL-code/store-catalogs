import { ALBERTO_BINI_MAIN } from './ALBERTO_BINI_MAIN'; // eslint-disable-line
import { ALBERTO_BINI_EU_WS } from './ALBERTO_BINI_EU_WS'; // eslint-disable-line
import { ALBERTO_BINI_SALES } from './ALBERTO_BINI_SALES'; // eslint-disable-line
import { KREMEN_BELTS_MAIN } from './KREMEN_BELTS_MAIN'; // eslint-disable-line
import { KREMEN_BELTS_SALES } from './KREMEN_BELTS_SALES'; // eslint-disable-line

export const DEVELOP_STORE = {
    ...ALBERTO_BINI_MAIN,
    // ...ALBERTO_BINI_EU_WS,
    // ...ALBERTO_BINI_SALES,
    ...KREMEN_BELTS_MAIN,
    // ...KREMEN_BELTS_SALES,
    URL: [
        'http://localhost:3000',
        'http://localhost:3001',
        'https://sales-nest-dev.netlify.app',
        'https://sales-nest.netlify.app',
        'https://dev-sn.netlify.app',
    ],
    // telegram_sender: !window?.location?.origin.includes('localhost'),
    // telegram_sender: true,
};
