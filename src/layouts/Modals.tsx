import Login from 'pages/DialogApp/Login';
import Logout from 'pages/DialogApp/Logout';
import Register from 'pages/DialogApp/Register';
import ForgotPassword from 'pages/DialogApp/ForgotPassword';
import RegisterWarning from 'pages/DialogApp/RegisterWarning';

interface ModalsInterface {
    string;
    setAuth;
    lang?;
    openModalType;
    setOpenModalType;
    storeToApprove?: string | null;
}

const Modals = ({ string, setAuth, lang, openModalType, setOpenModalType, storeToApprove }: ModalsInterface) => {
    return (
        <>
            {/* {openModalType === 'logout' && (
                <Logout setAuth={setAuth} string={string} close={() => setOpenModalType(null)} />
            )} */}
            {/* {openModalType === 'register' && (
                <Register
                    setAuth={setAuth}
                    lang={lang}
                    string={string}
                    close={() => setOpenModalType(null)}
                    setOpenModalType={setOpenModalType}
                />
            )} */}
            {/* {openModalType === 'forgot-password' && (
                <ForgotPassword
                    string={string}
                    close={() => setOpenModalType(null)}
                    setOpenModalType={setOpenModalType}
                />
            )} */}
            {openModalType === 'register-warning' && (
                <RegisterWarning
                    string={string}
                    setOpenModalType={setOpenModalType}
                    close={() => setOpenModalType(null)}
                />
            )}
        </>
    );
};

export default Modals;
