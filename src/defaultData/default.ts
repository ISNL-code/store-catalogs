import { ViewModeType } from 'store_constants/types';

interface DefaultValuesInterface {
    logo: string;
    currency: string;
    view_mode: ViewModeType;
}

export const DEFAULT_VALUES: DefaultValuesInterface = {
    logo: require('assets/img/logo.png'),
    currency: '¤',
    view_mode: ViewModeType?.card,
};
