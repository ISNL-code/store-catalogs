import { Box, TextField, Typography } from '@mui/material';
import ModalWindow from 'components/atoms/ModalWindow/ModalWindow';
import { useNavigate } from 'react-router-dom';

const LanguageWarning = ({ string, close }) => {
    const navigate = useNavigate();

    return (
        <ModalWindow
            type={'error'}
            title={string?.language_error}
            text={
                string?.this_catalog_does_not_support_the_current_language_to_continue_select_a_language_from_the_list_in_the_languages_menu
            }
            actionTitle={string?.ok}
            secondaryTitle={string?.back_to_stores}
            secondaryAction={() => {
                navigate('/');
            }}
            closeAction={() => {
                close();
            }}
            primaryAction={() => {
                close();
            }}
        >
            <></>
        </ModalWindow>
    );
};

export default LanguageWarning;
