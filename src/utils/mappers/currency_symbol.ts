import { DEFAULT_VALUES } from 'defaultData/default';

export const map_currency_symbol = (currency?: string | null): string => {
    if (currency === 'USD') return '$';
    if (currency === 'UAH') return '₴';
    if (currency === 'EUR') return '€';
    return DEFAULT_VALUES?.currency;
};
