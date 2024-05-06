import { Button } from '@mui/material';
import { Colors } from 'colors';

interface Props {
    name: string;
    href: string;
}
const SideLink = ({ name, href }: Props) => {
    return (
        <Button component="a" variant="outlined" href={href} color="error" sx={{ backgroundColor: Colors?.WHITE }}>
            {name}
        </Button>
    );
};

export default SideLink;
