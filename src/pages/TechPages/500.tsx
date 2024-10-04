import { useEffect } from 'react';
import ErrorComponent from './ErrorComponent';
import { telegramSender } from 'utils/telegramSender';
import { STORE_CONFIG } from 'store_constants/stores_config';

const PAGE_500 = () => {
    const { STATUS } = STORE_CONFIG;

    useEffect(() => {
        if (STATUS) telegramSender({ action: STATUS });
    }, []); //eslint-disable-line

    return <ErrorComponent code="69" title="SERVER ERROR" withLink={false} />;
};

export default PAGE_500;
