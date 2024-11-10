import { useOutletContext } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';
import { Color } from 'constants/colors';
import SideBarButton from '../../atoms/Buttons/SideBarButton';
import SendIcon from '@mui/icons-material/Send';

const MessageButton = ({ action }) => {
    const { string }: any = useOutletContext();
    const { sx } = useDevice();

    return (
        <SideBarButton
            action={() => action()}
            color={Color?.PRIMARY}
            positionRight={sx ? 12 : 12}
            positionBottom={sx ? 72 : 12}
            title={string?.message}
            icon={<SendIcon color="primary" />}
        />
    );
};

export default MessageButton;
