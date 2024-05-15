import { useState } from 'react';

export enum DialogWindowType {
    RESET_PASSWORD = 'reset_password',
    LOGIN = 'login',
    REGISTER = 'register',
    LOGOUT = 'logout',
    SUCCESS = 'success',
    QUESTION = 'question',
    AUTH_WARN = 'auth_warn',
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
