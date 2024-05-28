import QuestionForm from 'pages/DialogApp/QuestionForm';
import ForgotPasswordForm from 'pages/DialogApp/ForgotPassword';
import Login from 'pages/DialogApp/Login';
import Logout from 'pages/DialogApp/Logout';
import Register from 'pages/DialogApp/Register';
import { DialogWindowType } from './hooks/useFormsApp';
import SuccessRequest from 'pages/DialogApp/SuccessRequest';
import SuccessMailSent from 'pages/DialogApp/SuccessMailSent';
import NewPassword from 'pages/DialogApp/NewPassword';
import SomethingWentWrong from 'pages/DialogApp/SomethingWentWrong';
import SuccessPasswordChange from 'pages/DialogApp/SuccessPasswordChange';
import ClearCartConfirm from 'pages/DialogApp/ClearCartConfirm';
import ClearFavoritesConfirm from 'pages/DialogApp/ClearFavoritesConfirm';
import WarningOrderLimit from 'pages/DialogApp/WarningOrderLimit';
import TableSizeWindow from 'pages/DialogApp/TableSizeWindow';
import { DialogStateInterface } from 'types';

interface Props {
    location;
    string;
    activeDialogWindow;
    handleOpenDialog;
    setAuth?;
    favorites?;
    cart?;
    dialogState?: DialogStateInterface | null;
}

const DialogApp = ({
    location,
    string,
    activeDialogWindow,
    handleOpenDialog,
    setAuth,
    favorites,
    cart,
    dialogState,
}: Props) => {
    if (!activeDialogWindow) return null;

    return (
        <>
            {/* <> * form modals * </> */}

            <Login
                location={location}
                isOpen={activeDialogWindow === DialogWindowType?.LOGIN}
                setIsOpen={handleOpenDialog}
                string={string}
                setAuth={setAuth}
            />
            <ForgotPasswordForm
                location={location}
                isOpen={activeDialogWindow === DialogWindowType?.RESET_PASSWORD}
                setIsOpen={handleOpenDialog}
                string={string}
            />
            <Register
                location={location}
                isOpen={activeDialogWindow === DialogWindowType?.REGISTER}
                setIsOpen={handleOpenDialog}
                string={string}
                setAuth={setAuth}
            />
            <QuestionForm
                isOpen={activeDialogWindow === DialogWindowType?.QUESTION}
                setIsOpen={handleOpenDialog}
                string={string}
                dialogState={dialogState}
            />
            <NewPassword
                isOpen={activeDialogWindow === DialogWindowType?.NEW_PASSWORD}
                setIsOpen={handleOpenDialog}
                string={string}
            />

            {/* <> * confirm modals * </> */}

            <Logout
                location={location}
                isOpen={activeDialogWindow === DialogWindowType?.LOGOUT}
                setIsOpen={handleOpenDialog}
                string={string}
                setAuth={setAuth}
            />
            <ClearCartConfirm
                isOpen={activeDialogWindow === DialogWindowType?.CLEAR_CART}
                setIsOpen={handleOpenDialog}
                string={string}
                cart={cart}
            />
            <ClearFavoritesConfirm
                isOpen={activeDialogWindow === DialogWindowType?.CLEAR_FAVORITES}
                setIsOpen={handleOpenDialog}
                string={string}
                favorites={favorites}
            />

            <WarningOrderLimit
                isOpen={activeDialogWindow === DialogWindowType?.WARNING_ORDERING_LIMIT}
                setIsOpen={handleOpenDialog}
                string={string}
            />

            {/* <> * info modals * </> */}

            <SuccessRequest
                isOpen={activeDialogWindow === DialogWindowType?.SUCCESS_REQUEST}
                setIsOpen={handleOpenDialog}
                string={string}
            />

            <SuccessMailSent
                isOpen={activeDialogWindow === DialogWindowType?.SUCCESS_MAIL_SENT}
                setIsOpen={handleOpenDialog}
                string={string}
            />
            <SuccessPasswordChange
                isOpen={activeDialogWindow === DialogWindowType?.SUCCESS_PASSWORD_CHANGE}
                string={string}
            />

            <SomethingWentWrong
                isOpen={activeDialogWindow === DialogWindowType?.WENT_WRONG}
                setIsOpen={handleOpenDialog}
                string={string}
            />

            {/* <> * content modals * </> */}

            <TableSizeWindow
                isOpen={activeDialogWindow === DialogWindowType?.TABLE_SIZE}
                setIsOpen={handleOpenDialog}
                string={string}
                dialogState={dialogState}
            />
        </>
    );
};

export default DialogApp;
