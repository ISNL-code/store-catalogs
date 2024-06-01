import { ROUTES } from 'router/routes';
import { useNavigate } from 'react-router-dom';

const useHandleError = () => {
    const navigate = useNavigate();

    const handleError = err => {
        if (err?.response?.status === 401) navigate(ROUTES?.PAGE_401);
        if (err?.response?.status === 403) navigate(ROUTES?.PAGE_401);
        if (err?.response?.status === 404) navigate(ROUTES?.PAGE_401);
        if (err?.response?.status > 500) navigate(ROUTES?.PAGE_500);
    };

    return handleError;
};

export default useHandleError;
