import { Tooltip, Typography } from '@mui/material';

interface Props {
    data?: any[];
    title?: string;
    children: JSX.Element;
    maxWidth?: number;
    hidden?: boolean;
}

const StyledTooltip = ({ data = [], title = '', children, maxWidth = 500, hidden = false }: Props) => {
    return (
        <Tooltip
            sx={{ cursor: 'default', zIndex: 5000 }}
            title={
                (data.length ? (
                    <>
                        {data.map(el => (
                            <Typography key={el} sx={{ fontSize: 14, color: '#000' }}>
                                {el}
                            </Typography>
                        ))}
                    </>
                ) : (
                    <Typography sx={{ fontSize: 14, color: '#000' }}>{title}</Typography>
                )) as JSX.Element
            }
            arrow
            placement="top-end"
            componentsProps={{
                tooltip: {
                    sx: {
                        backgroundColor: '#ffffff',
                        border: '1px solid #1976d290',
                        maxWidth: maxWidth,
                        px: 2,
                        py: 1,
                        display: hidden ? 'none' : 'block',
                    },
                },
                arrow: {
                    sx: {
                        color: '#fff',
                        '&:before': {
                            border: '1px solid #1976d290',
                        },
                    },
                },
            }}
        >
            {children}
        </Tooltip>
    );
};

export default StyledTooltip;
