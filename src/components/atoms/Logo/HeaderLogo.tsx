import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';

const HeaderLogo = ({ title, path, font = 'Roboto', imgUrl, headerHeight }) => {
    const navigate = useNavigate();
    const { xxs, xxxxs } = useDevice();
    return (
        <Box
            sx={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                opacity: !imgUrl ? 0 : 1,
                transition: 'opacity 500ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onClick={() => {
                navigate(path);
            }}
        >
            <img src={imgUrl} style={{ height: xxs ? headerHeight - 12 : headerHeight - 3 }} alt="img" />

            <Typography sx={{ fontFamily: font, fontSize: xxxxs ? 16 : xxs ? 22 : 26, fontWeight: 700 }}>
                {title}
            </Typography>
        </Box>
    );
};

export default HeaderLogo;
