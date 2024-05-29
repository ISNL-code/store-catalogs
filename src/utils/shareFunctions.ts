// src/utils/shareFunctions.ts

// Function to open a URL in the same window
const openInSameWindow = (url: string) => {
    window.location.href = url;
};

export const shareOnTelegram = (url: string) => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}`;
    openInSameWindow(telegramUrl);
};

export const shareOnWhatsApp = (url: string) => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;
    openInSameWindow(whatsappUrl);
};

export const shareOnViber = (url: string) => {
    const message = `Check this out: ${url}`;
    const viberUrl = `viber://forward?text=${encodeURIComponent(message)}}`;
    openInSameWindow(viberUrl);
};

export const shareOnEmail = (url: string) => {
    const subject = 'Sales Nest Catalogs Link';
    const body = `I thought you might find this interesting:\n\n${url}`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    openInSameWindow(mailtoUrl);
};
