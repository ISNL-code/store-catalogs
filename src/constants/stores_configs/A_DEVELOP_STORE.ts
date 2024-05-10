import { ALBERTO_BINI_EU } from './ALBERTO_BINI_EU'; // eslint-disable-line
import { ALBERTO_BINI_KZ } from './ALBERTO_BINI_KZ'; // eslint-disable-line
import { ALBERTO_BINI_MAIN } from './ALBERTO_BINI_MAIN'; // eslint-disable-line
import { ALBERTO_BINI_OUTLET } from './ALBERTO_BINI_OUTLET'; // eslint-disable-line
import { ALBERTO_BINI_SALES } from './ALBERTO_BINI_SALES'; // eslint-disable-line
import { KREMEN_BELTS_MAIN } from './KREMEN_BELTS_MAIN'; // eslint-disable-line
import { KREMEN_BELTS_SALES } from './KREMEN_BELTS_SALES'; // eslint-disable-line

export const DEVELOP_STORE = {
    // ...ALBERTO_BINI_MAIN,
    ...ALBERTO_BINI_EU,
    // ...ALBERTO_BINI_KZ,
    // ...ALBERTO_BINI_OUTLET,
    // ...ALBERTO_BINI_SALES,
    // ...KREMEN_BELTS_MAIN,
    // ...KREMEN_BELTS_SALES,
    URL: ['http://localhost:3000', 'https://sales-nest-dev.netlify.app/'],
};
