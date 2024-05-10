import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { IconButton } from '@mui/material';

export function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <IconButton
            onClick={e => {
                e.stopPropagation();
                onClick();
            }}
            sx={{ zIndex: 1000, position: 'absolute', bottom: 0, left: 0 }}
        >
            <ArrowLeftIcon />
        </IconButton>
    );
}

export function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <IconButton
            onClick={e => {
                e.stopPropagation();
                onClick();
            }}
            sx={{ zIndex: 1000, position: 'absolute', bottom: 0, right: 0 }}
        >
            <ArrowRightIcon />
        </IconButton>
    );
}
