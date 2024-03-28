import { ClickAwayListener, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';

interface Props {
    data?: any[];
    title?: string;
    children: JSX.Element;
}

const StyledTooltip = ({ data = [], title = '', children }: Props) => {
    const [open, setOpen] = useState(false);
    return (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
            <Tooltip
                sx={{ cursor: 'pointer' }}
                onClick={() => setOpen(!open)}
                open={open}
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
                            border: '1px solid #1976d2',
                            maxWidth: '500px',
                            px: 2,
                            py: 1,
                        },
                    },
                    arrow: {
                        sx: {
                            color: '#fff',
                            '&:before': {
                                border: '1px solid #1976d2',
                            },
                        },
                    },
                }}
            >
                {children}
            </Tooltip>
        </ClickAwayListener>
    );
};

export default StyledTooltip;
