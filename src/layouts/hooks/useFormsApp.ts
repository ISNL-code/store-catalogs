import { useState } from 'react';

export enum DialogWindowType {
    RESET_PASSWORD = 'reset_password',
    NEW_PASSWORD = 'new-password',
    LOGIN = 'login',
    REGISTER = 'register',
    LOGOUT = 'logout',
    SUCCESS_REQUEST = 'success_request',
    SUCCESS_MAIL_SENT = 'success_mail_sent',
    SUCCESS_ORDERING = 'success_ordering',
    QUESTION = 'question',
    AUTH_WARN = 'auth_warn',
    WENT_WRONG = 'went_wong',
    SUCCESS_PASSWORD_CHANGE = 'success_password_change',
    CLEAR_CART = 'clear_cart',
    CLEAR_FAVORITES = 'clear_favorites',
    WARNING_ORDERING_LIMIT = 'warning_order_limit',
}

interface Res {
    handleOpenDialog: (modalType) => void;
    activeDialogWindow: DialogWindowType | null;
}

export const useFormsApp = (): Res => {
    const [activeDialogWindow, seActiveDialogWindow] = useState<DialogWindowType | null>(null);

    const handleOpenDialog = modalType => {
        if (modalType === null) {
            seActiveDialogWindow(null);
        } else if (modalType === activeDialogWindow) {
            seActiveDialogWindow(null);
        } else if (modalType) {
            seActiveDialogWindow(modalType);
        }
    };

    return { handleOpenDialog, activeDialogWindow };
};
