import { ALBERTO_BINI_MAIN } from './ALBERTO_BINI_MAIN'; // eslint-disable-line
import { ALBERTO_BINI_EU_WS } from './ALBERTO_BINI_EU_WS'; // eslint-disable-line
import { ALBERTO_BINI_SALES } from './ALBERTO_BINI_SALES'; // eslint-disable-line
import { YULIA_TRUBA_MAIN } from './YULIA_TRUBA_MAIN'; // eslint-disable-line
import { RETAIL_ALBERTO_BINI } from './RETAIL_ALBERTO_BINI'; // eslint-disable-line
import { PASMA } from './PASMA'; // eslint-disable-line
import { ALBERTO_BINI_KZ_WS } from './ALBERTO_BINI_KZ_WS'; // eslint-disable-line

export const DEVELOP_STORE = {
    ...ALBERTO_BINI_MAIN,
    // ...ALBERTO_BINI_EU_WS,
    // ...ALBERTO_BINI_KZ_WS,
    // ...ALBERTO_BINI_OUTLET,
    // ...ALBERTO_BINI_SALES,
    // ...YULIA_TRUBA_MAIN,
    // ...RETAIL_ALBERTO_BINI,
    // ...PASMA,
    // ...ALBERTO_BINI_KZ_WS,
    // ...ALBERTO_BINI_KZ_EUR_WS,
    URL: ['http://localhost:3000', 'http://localhost:3001'],
    // telegram_sender: !window?.location?.origin.includes('localhost'),
    telegram_sender: true,
};
