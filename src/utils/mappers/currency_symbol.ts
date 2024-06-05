import { DEFAULT_VALUES } from 'defaultData/default';

export const map_currency_symbol = (currency: string): string => {
    if (['USD', '$'].includes(currency)) return '$';
    if (['UAH', '₴'].includes(currency)) return '₴';
    if (['EUR', '€'].includes(currency)) return '€';
    if (['KZT ', '₸'].includes(currency)) return '€';
    return DEFAULT_VALUES?.currency;
};
