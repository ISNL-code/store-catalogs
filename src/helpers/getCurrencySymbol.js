export const getCurrencySymbol = currency => {
    if (currency === 'USD') return '$';
    if (currency === 'UAH') return '₴';
    return currency;
};
