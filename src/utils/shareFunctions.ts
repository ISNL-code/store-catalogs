// src/utils/shareFunctions.ts

// Function to open a URL in a new window
const openInNewWindow = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
};

export const shareOnTelegram = (url: string) => {
    const message = 'Check this out: '; // Your message goes here
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`;
    openInNewWindow(telegramUrl);
};

export const shareOnWhatsApp = (url: string) => {
    const message = 'Check this out: '; // Your message goes here
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message + url)}`;
    openInNewWindow(whatsappUrl);
};

export const shareOnViber = (url: string) => {
    const message = 'Check this out: '; // Your message goes here
    const viberUrl = `viber://forward?text=${encodeURIComponent(message + url)}`;
    openInNewWindow(viberUrl);
};

export const shareOnEmail = (url: string) => {
    const subject = 'Interesting link'; // Your subject goes here
    const body = `I thought you might find this interesting:\n\n${url}`; // Your email body goes here
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    openInNewWindow(mailtoUrl);
};
