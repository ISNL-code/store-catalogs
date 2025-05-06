import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { STORAGE_KEYS } from 'constants/local_storage_keys';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { getStorageItem } from 'utils/storageUtils';

export function useLangSearchParam() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [langParam, setLangParam] = useState<string | null>(null);
    const { APP_LANGUAGE } = STORE_CONFIG;

    useEffect(() => {
        const resolveLang = async () => {
            let lang = searchParams.get('lang');

            if (!lang) {
                const storedLang = await getStorageItem(STORAGE_KEYS?.LANGUAGE_KEY);
                lang = storedLang || APP_LANGUAGE;

                searchParams.set('lang', JSON?.parse(lang));
                setSearchParams(searchParams);
            }

            setLangParam(lang);
        };

        resolveLang();
    }, [searchParams, setSearchParams, APP_LANGUAGE]);

    return { langParam };
}
