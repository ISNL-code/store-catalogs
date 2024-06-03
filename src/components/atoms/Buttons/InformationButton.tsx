import { Fab } from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { useDevice } from 'hooks/useDevice';
import { useOutletContext } from 'react-router-dom';
import { CatalogContextInterface, HomeContextInterface } from 'types/outlet_context_models';
import { DialogWindowType } from 'layouts/hooks/useFormsApp';

const InformationButton = () => {
    const { handleOpenDialog }: HomeContextInterface | CatalogContextInterface = useOutletContext();
    const { sx } = useDevice();

    return (
        <Fab
            size="small"
            sx={{
                zIndex: 50,
                position: 'fixed',
                left: sx ? '20px' : '40px',
                bottom: sx ? 80 : 16,
                backgroundColor: 'lime',
            }}
            onClick={() => handleOpenDialog(DialogWindowType.APP_INFORMATION)}
        >
            <LightbulbIcon />
        </Fab>
    );
};

export default InformationButton;
