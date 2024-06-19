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
                border: `2px solid ${Color.PRIMARY}`,
                borderRadius: 8,
                backgroundColor: Colors?.WHITE,
                cursor: 'pointer',
            }}
            onMouseDown={() => window.open(href, '_blank')}
            pr={1}
            pl={0.25}
            py={0}
        >
            <IconButton component="span" size="small" sx={{ '&:hover': { backgroundColor: Colors?.WHITE }, p: 0 }}>
                <LinkIcon sx={{ color: Color.PRIMARY, fontSize: 22, fontWeight: 700 }} />
            </IconButton>
            <Box
                component="span"
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
            </Box>
        </Box>
    );
};

export default SideLink;
