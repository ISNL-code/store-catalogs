import axios from 'axios';
import { STORE_CONFIG } from 'store_constants/stores_config';

const { STORE_NAME, TELEGRAM_SENDER } = STORE_CONFIG;

export const telegramSender = ({ action, contacts = '', text = '' }) => {
    // if (!TELEGRAM_SENDER || window?.location?.origin.includes('localhost')) return;

    try {
        const token = '6904212535:AAGvPEjkJds0aayd-oD1YVMbhLKeKt72yaE';
        const chatId = '480774886';
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
};
