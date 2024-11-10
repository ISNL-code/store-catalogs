import axios from 'axios';
import { STORE_CONFIG } from 'store_constants/stores_config';

const { STORE_NAME, TELEGRAM_SENDER, OPTIONS } = STORE_CONFIG;

export const telegramSender = ({ action, name, contacts = '', text = '' }) => {
    if (!TELEGRAM_SENDER) return;

    OPTIONS?.TELEGRAM_BOT?.forEach(bot => {
        if (!bot?.items?.includes(name)) return;
        try {
            const token = bot?.token;
            const chatId = bot?.chatId;
            const url = `https://api.telegram.org/bot${token}/sendMessage`;

            axios
                .get('https://ipapi.co/json/')
                .then(response => {
                    const userCountry = response.data.country_name;
                    const userCity = response.data.city;

                    axios.post(url, {
                        chat_id: chatId,
                        text:
                            `${action} - ${STORE_NAME} - ${userCountry + '/' + userCity} ` +
                            ' ' +
                            `${contacts ? ` - (contacts) ${contacts}` : ''}` +
                            ' ' +
                            `${text ? ` - (text) ${text}` : ''}`,
                    });
                })
                .catch(error => {
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    });
};
