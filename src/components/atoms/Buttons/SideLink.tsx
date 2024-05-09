import { Button } from '@mui/material';

interface Props {
    name: string;
    href: string;
}
const SideLink = ({ name, href }: Props) => {
    return (
        <Button
            component="a"
            variant="contained"
            href={href}
            sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: 12,
            }}
        >
            {name}
        </Button>
    );
};

export default SideLink;
