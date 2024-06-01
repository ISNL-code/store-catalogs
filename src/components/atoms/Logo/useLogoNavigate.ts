import { HOME_ROUTE, LANDING_ROUTE, LOGIN_ROUTE, ROUTES, STORE_ROUTE } from 'router/routes';
import { useLocation, useNavigate } from 'react-router-dom';
import { STORE_CONFIG } from 'store_constants/stores_config';

const useLogoNavigate = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { STORE_CODE } = STORE_CONFIG;

    const handleLogoNavigate = () => {
        const landingLocation = location.pathname.includes(ROUTES?.LANDING);
        const homeLocation = location.pathname.includes(ROUTES?.HOME);
        const catalogLocation = location.pathname.includes(ROUTES?.STORE);
        const secureLocation = location.pathname.includes(ROUTES?.SECURITY);
        if (landingLocation) navigate(LANDING_ROUTE?.root());
        if (homeLocation) navigate(HOME_ROUTE?.root(STORE_CODE));
        if (catalogLocation) navigate(STORE_ROUTE?.root(STORE_CODE));
        if (secureLocation) navigate(LOGIN_ROUTE?.root(STORE_CODE, 'login'));
    };
    return handleLogoNavigate;
};

export default useLogoNavigate;
