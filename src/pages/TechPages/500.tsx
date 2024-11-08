import { useEffect } from 'react';
import ErrorComponent from './ErrorComponent';
import { telegramSender } from 'utils/telegramSender';
import { STORE_CONFIG } from 'store_constants/stores_config';

const PAGE_500 = () => {
    const { STATUS } = STORE_CONFIG;

    useEffect(() => {
        if (STATUS) telegramSender({ action: STATUS, name: 'error' });
    }, []); //eslint-disable-line

    return <ErrorComponent code="500" title="SERVER ERROR" withLink={false} status={STATUS} />;
};

export default PAGE_500;
