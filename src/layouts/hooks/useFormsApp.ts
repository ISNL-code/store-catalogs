import { useState } from 'react';
import { DialogStateInterface } from 'types/app_models';

export enum DialogWindowType {
    RESET_PASSWORD = 'reset_password',
    NEW_PASSWORD = 'new-password',
    LOGIN = 'login',
    REGISTER = 'register',
    LOGOUT = 'logout',
    SUCCESS_REQUEST = 'success_request',
    SUCCESS_MAIL_SENT = 'success_mail_sent',
    QUESTION = 'question',
    AUTH_WARN = 'auth_warn',
    WENT_WRONG = 'went_wong',
    SUCCESS_PASSWORD_CHANGE = 'success_password_change',
    CLEAR_CART = 'clear_cart',
    CLEAR_FAVORITES = 'clear_favorites',
    WARNING_ORDERING_LIMIT = 'warning_order_limit',
    TABLE_SIZE = 'table size',
    APP_INFORMATION = 'app_information',
    PRICING = 'pricing',
}

interface Res {
    handleOpenDialog: (modalType) => void;
    activeDialogWindow: DialogWindowType | null;
    handleSetDialogState: (data) => void;
    dialogState: DialogStateInterface | null;
}

export const useFormsApp = (): Res => {
    const [activeDialogWindow, seActiveDialogWindow] = useState<DialogWindowType | null>(null);
    const [dialogState, setDialogState] = useState<DialogStateInterface | null>(null);

    const handleOpenDialog = modalType => {
        if (modalType === null) {
            seActiveDialogWindow(null);
        } else if (modalType === activeDialogWindow) {
            seActiveDialogWindow(null);
        } else if (modalType) {
            seActiveDialogWindow(modalType);
        }
    };

    const handleSetDialogState = state => {
        setDialogState(state);
    };

    return { handleOpenDialog, activeDialogWindow, handleSetDialogState, dialogState };
};
