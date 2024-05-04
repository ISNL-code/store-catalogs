export const getCurrencySymbol = currency => {
    if (currency === 'USD') return '$';
    if (currency === 'UAH') return '₴';
    if (currency === 'EUR') return '€';
    return currency;
};
