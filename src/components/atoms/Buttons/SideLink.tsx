import { Box, Button, IconButton } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import { Colors } from 'colors';
import { useDevice } from 'hooks/useDevice';
interface Props {
    name: string;
    href: string;
}
const SideLink = ({ name, href }: Props) => {
    const { sx } = useDevice();
    return (
        <a href={href} style={{ textDecoration: 'none' }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: `1px solid ${Colors?.BLUE}`,
                    borderRadius: 8,
                    backgroundColor: Colors?.WHITE,
                    padding: '0 8px 0 4px',
                }}
            >
                <IconButton
                    component="span"
                    size="small"
                    sx={{ width: 28, height: 20, p: 0.25, '&:hover': { backgroundColor: Colors?.WHITE } }}
                >
                    <LinkIcon sx={{ color: Colors?.BLUE, fontSize: 24, fontWeight: 700 }} />
                </IconButton>
                <span
                    style={{
                        color: Colors?.BLUE,

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
        </a>
    );
};

export default SideLink;
