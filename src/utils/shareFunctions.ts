// src/utils/shareFunctions.ts

// Function to open a URL in a new window
const openInNewWindow = (url: string) => {
    window.open(url, '_blank');
};

export const shareOnTelegram = (url: string) => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}`;
    openInNewWindow(telegramUrl);
};

export const shareOnWhatsApp = (url: string) => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;
    openInNewWindow(whatsappUrl);
};

export const shareOnViber = (url: string) => {
    const message = `Check this out: ${url}`;
    const viberUrl = `viber://forward?text=${encodeURIComponent(message)}}`;
    openInNewWindow(viberUrl);
};

export const shareOnEmail = (url: string) => {
    const subject = 'Cocktail Catalogs Link';
    const body = `I thought you might find this interesting:\n\n${url}`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    openInNewWindow(mailtoUrl);
};
