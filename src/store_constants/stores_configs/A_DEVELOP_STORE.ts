import { ALBERTO_BINI_KZ_WS } from './ALBERTO_BINI_KZ_WS'; // eslint-disable-line
import { ALBERTO_BINI_MAIN } from './ALBERTO_BINI_MAIN'; // eslint-disable-line
import { ALBERTO_BINI_SALES } from './ALBERTO_BINI_SALES'; // eslint-disable-line
import { KREMEN_BELTS_MAIN } from './KREMEN_BELTS_MAIN'; // eslint-disable-line
import { RETAIL_ALBERTO_BINI } from './RETAIL_ALBERTO_BINI'; // eslint-disable-line

export const DEVELOP_STORE = {
    ...ALBERTO_BINI_MAIN,
    ...ALBERTO_BINI_KZ_WS,
    // ...ALBERTO_BINI_SALES,
    // ...RETAIL_ALBERTO_BINI,
    ...KREMEN_BELTS_MAIN,

    URL: ['http://localhost:3000', 'http://localhost:3001'],

    // telegram_sender: true,
};
