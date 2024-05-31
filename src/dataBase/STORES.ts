import { ALBERTO_BINI_EU_KZ_DB } from './stores_db/ALBERTO_BINI_EU_KZ_DB';
import { ALBERTO_BINI_MAIN_DB } from './stores_db/ALBERTO_BINI_MAIN_DB';
import { ALBERTO_BINI_OUTLET_DB } from './stores_db/ALBERTO_BINI_OUTLET_DB';
import { KREMEN_BELTS_MAIN_DB } from './stores_db/KREMEN_BELTS_MAIN_DB';
import { KREMEN_BELTS_SALES_DB } from './stores_db/KREMEN_BELTS_SALES_DB';

export const STORES_DATA = [
    ALBERTO_BINI_MAIN_DB, //main
    ALBERTO_BINI_OUTLET_DB, // ws-sales, outlet,
    ALBERTO_BINI_EU_KZ_DB, //eu, kz, ws, retail
    KREMEN_BELTS_MAIN_DB,
    KREMEN_BELTS_SALES_DB,
];
