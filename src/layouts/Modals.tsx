import Login from 'pages/Login/Login';
import Logout from 'pages/Login/Logout';
import Register from 'pages/Login/Register';
import ForgotPassword from 'pages/Login/ForgotPassword';
import RegisterWarning from 'pages/Login/RegisterWarning';

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
            {openModalType === 'login' && (
                <Login
                    setAuth={setAuth}
                    string={string}
                    close={() => setOpenModalType(null)}
                    setOpenModalType={setOpenModalType}
                />
            )}
            {openModalType === 'store-password' && (
                <Login
                    setAuth={setAuth}
                    string={string}
                    close={() => setOpenModalType(null)}
                    setOpenModalType={setOpenModalType}
                />
            )}
            {openModalType === 'logout' && (
                <Logout setAuth={setAuth} string={string} close={() => setOpenModalType(null)} />
            )}
            {openModalType === 'register' && (
                <Register
                    setAuth={setAuth}
                    lang={lang}
                    string={string}
                    close={() => setOpenModalType(null)}
                    setOpenModalType={setOpenModalType}
                />
            )}
            {openModalType === 'forgot-password' && (
                <ForgotPassword
                    string={string}
                    close={() => setOpenModalType(null)}
                    setOpenModalType={setOpenModalType}
                />
            )}
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
