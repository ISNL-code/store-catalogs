export enum WEB_MODE_ENUMS {
    STORE_MODE = 'store_mode',
    LANDING_MODE = 'landing_mode',
}

export const APP_CONFIG = {
    WEB_MODE: WEB_MODE_ENUMS?.LANDING_MODE, // for deploying landing site
    // WEB_MODE: WEB_MODE_ENUMS?.STORE_MODE, // for deploying store sites
};
