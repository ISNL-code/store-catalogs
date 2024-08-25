import { ALBERTO_BINI_MAIN } from './ALBERTO_BINI_MAIN'; // eslint-disable-line
import { ALBERTO_BINI_EU_WS } from './ALBERTO_BINI_EU_WS'; // eslint-disable-line
import { ALBERTO_BINI_KZ_WS } from './ALBERTO_BINI_KZ_WS'; // eslint-disable-line
import { ALBERTO_BINI_OUTLET } from './ALBERTO_BINI_OUTLET'; // eslint-disable-line
import { ALBERTO_BINI_SALES } from './ALBERTO_BINI_SALES'; // eslint-disable-line

export const DEVELOP_STORE = {
    ...ALBERTO_BINI_MAIN,
    ...ALBERTO_BINI_EU_WS,
    ...ALBERTO_BINI_KZ_WS,
    ...ALBERTO_BINI_OUTLET,
    // ...ALBERTO_BINI_SALES,
    URL: ['http://localhost:3000', 'http://localhost:3001'],
    // telegram_sender: !window?.location?.origin.includes('localhost'),
    // telegram_sender: true,
};
