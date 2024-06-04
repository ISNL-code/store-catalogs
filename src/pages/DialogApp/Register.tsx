import { useUserApi } from 'api/useUserApi';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Loader from 'components/atoms/Loader/Loader';
import { useFormik } from 'formik';
import registerFormValidation from 'utils/validation/registerFormValidation';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { TRANSLATED_COUNTRIES } from 'dataBase/COUNTRY_LIST';
import FormDialog from 'components/organisms/Modals/FormDialog';
import { DialogWindowType } from 'layouts/hooks/useFormsApp';
import { ROUTES } from 'router/routes';
import { STORAGE_KEYS } from 'constants/local_storage_keys';
import { setStorageItem } from 'utils/storageUtils';
import { telegramSender } from 'utils/telegramSender';

interface Props {
    setApiToken?: (token: string | null) => void;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<DialogWindowType | null>>;
    string: any;
    location: string;
    setAuth: Dispatch<SetStateAction<boolean>>;
    lang: string;
}

const INITIAL_VALUES = {
    password: '',
    email: '',
    phoneNumber: '',
    country: '',
};

export default function Register({ isOpen, setIsOpen, string, location, setAuth, lang, setApiToken }: Props) {
    const { STORE_CODE, STORE_NAME, SUPPORTED_COUNTRIES } = STORE_CONFIG;

    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);
    const [country, setCountry] = useState('');

    const { mutateAsync: register, isLoading } = useUserApi().useCustomerRegister();

    const formik = useFormik({
        initialValues: INITIAL_VALUES,
        validationSchema: registerFormValidation,
        onSubmit: values => {
            register({
                emailAddress: values.email,
                password: values.password,
                username: values.email,
                country: values.country,
                phone: values.phoneNumber,
                lang: 'en',
                storeCode: STORE_CODE,
            })
                .then(res => {
                    if (res.data.token) {
                        setStorageItem(STORAGE_KEYS?.ACCESS_TOKEN_KEY, JSON.stringify(res.data.token));
                        setApiToken && setApiToken(res.data.token);
                        setAuth(true);
                        setIsOpen(null);
                        telegramSender({
                            action: `ЗАРЕГЕСТРИРОВАЛСЯ`,
                            contacts: `email: ${values.email}, phone: ${values.phoneNumber}`,
                        });
                    }
                    return res;
                })
                .catch(_err => {
                    setIsError(true);
                });
        },
    });

    useEffect(() => {
        formik.setValues({
            password,
            email,
            phoneNumber,
            country,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password, email, phoneNumber, country]);

    const setInitialValue = () => {
        formik.resetForm();
        setIsError(false);
        setEmail('');
        setPassword('');
        setPhoneNumber('');
        setPhoneNumber('');
        setCountry('');
    };

    const handleTranslateCountry = val => {
        return string?.[val];
    };

    if (!isOpen) return null;
    return (
        <>
            {isLoading && <Loader />}
            <FormDialog
                variant="info"
                link={{
                    name: string?.already_registered,
                    action: () => {
                        setIsOpen(DialogWindowType?.LOGIN);
                    },
                }}
                string={string}
                onRefresh={() => {
                    setInitialValue();
                }}
                onClose={() => {
                    setIsOpen(null);
                    setInitialValue();
                }}
                title={string?.register + ' ' + string?.in + ' ' + `"${STORE_NAME}"` + ' ' + string?.catalog} // eslint-disable-line
                fullWidth
                buttons={[{ type: 'submit', name: string?.register }]}
                onSubmit={() => formik.handleSubmit()}
                description={null}
                error={{
                    text: string?.already_registered,
                    shown: isError,
                }}
                closeAvailable={Boolean(!location.includes(ROUTES?.SECURITY))}
                fields={[
                    {
                        component: 'textfield',
                        type: 'email',
                        label: string?.email,
                        value: email || '',
                        onChange: val => setEmail(val),
                        error: Boolean(formik.errors.email && formik.touched.email),
                        helperText: string?.[formik.errors.email ? formik.errors.email : ''] || '',
                        trim: true,
                    },
                    {
                        component: 'textfield',
                        type: 'password',
                        label: string?.password,
                        value: password || '',
                        onChange: val => setPassword(val),
                        error: Boolean(formik.errors.password && formik.touched.password),
                        helperText: string?.[formik.errors.password ? formik.errors.password : ''] || '',
                        trim: false,
                    },
                    {
                        component: 'textfield',
                        type: 'tel',
                        label: string?.phone_number,
                        value: phoneNumber || '',
                        onChange: val => setPhoneNumber(val),
                        error: Boolean(formik.errors.phoneNumber && formik.touched.phoneNumber),
                        helperText: string?.[formik.errors.phoneNumber ? formik.errors.phoneNumber : ''] || '',
                        trim: false,
                    },
                    {
                        component: 'autocomplete',
                        type: 'text',
                        label: string?.country,
                        value: country || '',
                        onChange: val => setCountry(val),
                        error: Boolean(formik.errors.country && formik.touched.country),
                        helperText: string?.[formik.errors.country ? formik.errors.country : ''] || '',
                        trim: false,
                        options: (SUPPORTED_COUNTRIES || TRANSLATED_COUNTRIES).map(el => {
                            return { value: el?.code, label: handleTranslateCountry(el?.country) };
                        }),
                    },
                ]}
            />
        </>
    );
}
