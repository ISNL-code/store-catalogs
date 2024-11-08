import { useFormik } from 'formik';
import pricingValidation from 'utils/validation/pricingValidation';
import FormDialog from 'components/organisms/Modals/FormDialog';
import { Fragment, useEffect, useState } from 'react';
import { DialogWindowType } from 'layouts/hooks/useFormsApp';
import { DialogStateInterface } from 'types/app_models';
import { telegramSender } from 'utils/telegramSender';

interface Props {
    isOpen: boolean;
    setIsOpen;
    string;
    dialogState?: DialogStateInterface | null;
}

export default function PricingForm({ isOpen, setIsOpen, string, dialogState }: Props) {
    const [formValues, setFormValues] = useState<any>({
        contacts: '',
        email: '',
        comment: '',
        allPrices: false,
    });

    useEffect(() => {
        setFormValues({ ...formValues });
    }, [isOpen]); // eslint-disable-line

    const formik = useFormik({
        initialValues: {
            contacts: '',
            email: '',
            comment: '',
            allPrices: false,
        },
        validationSchema: pricingValidation,
        onSubmit: values => {
            handleClose();
            telegramSender({
                action: `Запрос Цены`,
                name: 'price_request',
                contacts: `| email:${values.email}, other_contacts: ${values.contacts}`,
                text: `| comment: ${values.comment} || Want to know all prices: ${values.allPrices}`,
            });
            setIsOpen(DialogWindowType?.SUCCESS_REQUEST);
        },
    });

    useEffect(() => {
        formik.setValues(formValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formValues]);

    const handleClose = () => {
        setIsOpen(false);
        setFormValues({
            contacts: '',
            email: '',
            comment: '',
            allPrices: false,
        });
    };

    if (!isOpen) return null;

    return (
        <Fragment>
            <FormDialog
                link={null}
                variant="info"
                string={string}
                title={string?.pricing_form_description}
                onClose={() => setIsOpen(null)}
                onRefresh={() => {
                    formik.resetForm(); // Reset form errors and values
                    setFormValues({
                        contacts: '',
                        email: '',
                        comment: '',
                    });
                }}
                fullWidth
                buttons={[{ type: 'submit', name: string?.send }]}
                onSubmit={() => formik.handleSubmit()}
                description={string?.selected_model + ':' + ' ' + dialogState?.variantSku || ''} // eslint-disable-line
                closeAvailable
                error={null}
                fields={[
                    {
                        component: 'textfield',
                        type: 'email',
                        label: string?.email + '*',
                        value: formValues.email || '',
                        onChange: val =>
                            setFormValues(prev => {
                                return { ...prev, email: val };
                            }),
                        error: formik.errors.email && formik.touched.email,
                        helperText: string?.[formik.errors.email || ''],
                        trim: true,
                    },
                    {
                        component: 'textfield',
                        label: string?.contacts,
                        value: formValues.phone || '',
                        onChange: val =>
                            setFormValues(prev => {
                                return { ...prev, phone: val };
                            }),
                        type: 'tel',
                        error: formik.errors.contacts && formik.touched.contacts,
                        helperText: string?.[formik.errors.contacts || ''],
                        trim: false,
                    },
                    {
                        component: 'textfield',
                        type: 'text',
                        label: string?.comment,
                        value: formValues.comment || '',
                        onChange: val =>
                            setFormValues(prev => {
                                return { ...prev, comment: val };
                            }),
                        error: formik.errors.comment && formik.touched.comment,
                        helperText: string?.[formik.errors.comment || ''],
                        trim: false,
                    },
                    {
                        component: 'checkbox',
                        type: 'checkbox',
                        label: string?.want_to_know_all_prices,
                        value: formValues.allPrices,
                        onChange: val =>
                            setFormValues(prev => {
                                return { ...prev, allPrices: !formValues?.allPrices };
                            }),
                        error: null,
                        helperText: null,
                        trim: false,
                    },
                ]}
            />
        </Fragment>
    );
}
