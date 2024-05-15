import QuestionForm from 'pages/DialogApp/QuestionForm';
import ForgotPasswordForm from 'pages/DialogApp/ForgotPassword';
import Login from 'pages/DialogApp/Login';
import Logout from 'pages/DialogApp/Logout';
import Register from 'pages/DialogApp/Register';
import { DialogWindowType } from './hooks/useFormsApp';
import SuccessWindow from 'pages/DialogApp/SuccessWindow';

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

            {/* <> * confirm modals * </> */}

            <Logout
                location={location}
                isOpen={activeDialogWindow === DialogWindowType?.LOGOUT}
                setIsOpen={handleOpenDialog}
                string={string}
                setAuth={setAuth}
            />

            {/* <> * confirm modals * </> */}

            <SuccessWindow
                location={location}
                isOpen={activeDialogWindow === DialogWindowType?.SUCCESS}
                setIsOpen={handleOpenDialog}
                string={string}
            />
        </>
    );
};

export default DialogApp;
