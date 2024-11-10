import axios from 'axios';
import { STORE_CONFIG } from 'store_constants/stores_config';

const { STORE_NAME, TELEGRAM_SENDER, OPTIONS } = STORE_CONFIG;

const getUserLocation = async () => {
    try {
        const response = await axios.get('https://ipinfo.io/json?token=YOUR_TOKEN');
        const { country, city } = response.data;
        return { country, city };
    } catch (error) {
        return { country: 'Unknown', city: 'Unknown' };
    }
};

export const telegramSender = async ({ action, name, contacts = '', text = '' }) => {
    if (!TELEGRAM_SENDER) return;

    const location = await getUserLocation(); // Ждём получения местоположения

    OPTIONS?.TELEGRAM_BOT?.forEach(bot => {
        if (!bot?.items?.includes(name)) return;

        const token = bot?.token;
        const chatId = bot?.chatId;
        const url = `https://api.telegram.org/bot${token}/sendMessage`;

        // Формируем текст сообщения
        const messageText =
            `${action} - ${STORE_NAME} - ${location.country}/${location.city}` +
            `${contacts ? ` - (contacts) ${contacts}` : ''}` +
            `${text ? ` - (text) ${text}` : ''}`;

        // Отправляем сообщение в Telegram
        axios
            .post(url, {
                chat_id: chatId,
                text: messageText,
            })
            .catch(error => {
                console.error('Ошибка при отправке сообщения в Telegram:', error);
            });
    });
};
