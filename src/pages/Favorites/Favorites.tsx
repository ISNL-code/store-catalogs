import BackButton from 'components/atoms/Buttons/BackButton';
import EmptyPage from 'components/atoms/EmptyPage/EmptyPage';
import InstrumentalSubHeader from 'components/organisms/InstrumentalSubHeader/InstrumentalSubHeader';
import { useIsMount } from 'hooks/useIsMount';
import { useEffect } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

const Favorites = () => {
    const { storeCode, storeName } = useParams();
    const mount = useIsMount();
    const navigate = useNavigate();
    const { auth, openModalType, setOpenModalType }: any = useOutletContext();

    useEffect(() => {
        if (!auth) setOpenModalType('register-warning');
        return function cleanup() {
            setOpenModalType(null);
        };
    }, [auth]);

    useEffect(() => {
        if (mount) return;
        if (!auth && !openModalType) navigate(`/catalog/${storeCode}/${storeName}`);
    }, [openModalType]);

    if (!auth) return null;
    return (
        <>
            <InstrumentalSubHeader StartSlot={() => <BackButton nav={-1} action={() => {}} />} />

            {auth && <EmptyPage />}
        </>
    );
};

export default Favorites;
