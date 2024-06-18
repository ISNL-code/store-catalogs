import { Tooltip, Typography } from '@mui/material';
import { Colors } from 'constants/colors';

interface Props {
    data?: any[];
    title?: string;
    children: JSX.Element;
    maxWidth?: number;
    hidden?: boolean;
    position?:
        | 'top'
        | 'top-start'
        | 'top-end'
        | 'right'
        | 'right-end'
        | 'right-start'
        | 'left'
        | 'left-start'
        | 'left-end'
        | 'bottom'
        | 'bottom-start'
        | 'bottom-end';
}

const StyledTooltip = ({
    data = [],
    title = '',
    children,
    maxWidth = 500,
    hidden = false,
    position = 'bottom-end',
}: Props) => {
    return (
        <Tooltip
            sx={{ cursor: 'default', zIndex: 5000 }}
            title={
                (data.length ? (
                    <>
                        {data.map(el => (
                            <Typography key={el} sx={{ fontSize: 14 }}>
                                {el}
                            </Typography>
                        ))}
                    </>
                ) : (
                    <Typography sx={{ fontSize: 12, color: '#000' }}>{title}</Typography>
                )) as JSX.Element
            }
            arrow
            placement={position}
            componentsProps={{
                tooltip: {
                    sx: {
                        backgroundColor: '#ffffff',
                        border: '1px solid',
                        borderColor: Colors?.GRAY_500,
                        maxWidth: maxWidth,
                        p: 0.5,
                        px: 1,
                        display: hidden ? 'none' : 'block',
                    },
                },
                arrow: {
                    sx: {
                        color: '#fff',
                        '&:before': {
                            border: '1px solid',
                            borderColor: Colors?.GRAY_500,
                        },
                    },
                },
            }}
        >
            <span>{children}</span>
        </Tooltip>
    );
};

export default StyledTooltip;
