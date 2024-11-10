import { useNavigate, useOutletContext } from 'react-router-dom';
import { Color } from 'constants/colors';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import SideBarButton from '../../atoms/Buttons/SideBarButton';
import { useDevice } from 'hooks/useDevice';

const CallBackButton = ({ path }) => {
    const { string }: any = useOutletContext();
    const navigate = useNavigate();
    const { sx } = useDevice();

    return (
        <SideBarButton
            action={() => navigate(path)}
            color={Color?.SUCCESS}
            positionRight={sx ? 12 : 12}
            positionBottom={sx ? 118 : 60}
            title={string?.contacts}
            icon={<PhoneCallbackIcon color="success" />}
        />
    );
};

export default CallBackButton;
