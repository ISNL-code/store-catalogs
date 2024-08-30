import { STORE_CONFIG } from 'store_constants/stores_config';
const { STORAGE_KEY } = STORE_CONFIG;

export const STORAGE_KEYS = {
    LANGUAGE_KEY: `${STORAGE_KEY}-lng`,
    ACCESS_TOKEN_KEY: `${STORAGE_KEY}-tkn`,
    FAVORITE_KEY: `${STORAGE_KEY}-fav`,
    CART_KEY: `${STORAGE_KEY}-cart`,
    VIEW_MODE_KEY: `${STORAGE_KEY}-v-mode`,
};
