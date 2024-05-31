import { Box, IconButton } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import { Color, Colors } from 'constants/colors';
import { useDevice } from 'hooks/useDevice';

interface Props {
    name: string;
    href: string;
}

const SideLink = ({ name, href }: Props) => {
    const { sx } = useDevice();

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                border: `1px solid ${Color.PRIMARY}`,
                borderRadius: 8,
                backgroundColor: Colors?.WHITE,
                padding: '0 8px 0 4px',
            }}
            onMouseDown={() => window.open(href, '_blank')}
        >
            <IconButton
                component="span"
                size="small"
                sx={{ width: 28, height: 20, p: 0.25, '&:hover': { backgroundColor: Colors?.WHITE } }}
            >
                <LinkIcon sx={{ color: Color.PRIMARY, fontSize: 24, fontWeight: 700 }} />
            </IconButton>
            <span
                style={{
                    color: Color.PRIMARY,
                    fontSize: sx ? 12 : 15,
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
            >
                {name}
            </span>
        </Box>
    );
};

export default SideLink;
