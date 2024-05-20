import QuestionForm from 'pages/DialogApp/QuestionForm';
import ForgotPasswordForm from 'pages/DialogApp/ForgotPassword';
import Login from 'pages/DialogApp/Login';
import Logout from 'pages/DialogApp/Logout';
import Register from 'pages/DialogApp/Register';
import { DialogWindowType } from './hooks/useFormsApp';
import SuccessRequest from 'pages/DialogApp/SuccessRequest';
import SuccessMailSent from 'pages/DialogApp/SuccessMailSent';
import SuccessOrdering from 'pages/DialogApp/SuccessOrdering';
import NewPassword from 'pages/DialogApp/NewPassword';
import SomethingWentWrong from 'pages/DialogApp/SomethingWentWrong';

interface Props {
    location;
    string;
    activeDialogWindow;
    handleOpenDialog;
    setAuth;
}

const DialogApp = ({ location, string, activeDialogWindow, handleOpenDialog, setAuth }: Props) => {
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
                location={location}
                isOpen={activeDialogWindow === DialogWindowType?.QUESTION}
                setIsOpen={handleOpenDialog}
                string={string}
            />
            <NewPassword
                location={location}
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

            {/* <> * info modals * </> */}

            <SuccessRequest
                location={location}
                isOpen={activeDialogWindow === DialogWindowType?.SUCCESS_REQUEST}
                setIsOpen={handleOpenDialog}
                string={string}
            />

            <SuccessMailSent
                location={location}
                isOpen={activeDialogWindow === DialogWindowType?.SUCCESS_MAIL_SENT}
                setIsOpen={handleOpenDialog}
                string={string}
            />

            <SuccessOrdering
                location={location}
                isOpen={activeDialogWindow === DialogWindowType?.SUCCESS_ORDERING}
                setIsOpen={handleOpenDialog}
                string={string}
            />
            <SomethingWentWrong
                location={location}
                isOpen={activeDialogWindow === DialogWindowType?.WENT_WRONG}
                setIsOpen={handleOpenDialog}
                string={string}
            />
        </>
    );
};

export default DialogApp;
