// src/utils/shareFunctions.ts

// Function to open a URL in a new window
const openInNewWindow = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
};

export const shareOnTelegram = (url: string, imagePath: string) => {
    const message = `Check this out: ${url}`;
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`;
    openInNewWindow(telegramUrl);
};

export const shareOnWhatsApp = (url: string, imagePath: string) => {
    const message = `Check this out: ${url}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}%0A${encodeURIComponent(imagePath)}`;
    openInNewWindow(whatsappUrl);
};

export const shareOnViber = (url: string, imagePath: string) => {
    const message = `Check this out: ${url}`;
    const viberUrl = `viber://forward?text=${encodeURIComponent(message)}%0A${encodeURIComponent(imagePath)}`;
    openInNewWindow(viberUrl);
};

export const shareOnEmail = (url: string, imagePath: string) => {
    const subject = 'Interesting link';
    const body = `I thought you might find this interesting:\n\n${url}\n\nImage: ${imagePath}`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    openInNewWindow(mailtoUrl);
};
