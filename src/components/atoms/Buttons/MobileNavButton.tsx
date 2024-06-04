import { Badge, Box, IconButton, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { Color } from 'constants/colors';

interface MobileNavButtonInterface {
    icon: (props) => ReactNode;
    path?: string;
    title: string;
    childPath?: string[];
    action?;
    isActive?;
    badgeCount?: number;
    protectedPath?: boolean;
}

const MobileNavButton = ({
    icon,
    path,
    title,
    childPath,
    action,
    isActive,
    badgeCount,
    protectedPath = false,
}: MobileNavButtonInterface) => {
    const navigate = useNavigate();
    const location = useLocation();

    const active = location.pathname === path || childPath?.some(child => location.pathname.includes(child));

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.4 }}>
            <IconButton
                onClick={e => {
                    if (active) return;

                    if (action) {
                        action(e);
                    }
                    if (!path) return;
                    if (!protectedPath) navigate(path);
                }}
                sx={{
                    width: 33,
                    height: 33,
                    borderRadius: '12px',
                    border: '2px solid',
                    borderColor: active || isActive ? Color?.PRIMARY : '#fff',
                    p: 0.5,
                }}
            >
                <Badge
                    color="error"
                    badgeContent={badgeCount}
                    sx={{
                        '.MuiBadge-badge': {
                            width: 20,
                            height: 20,
                            minWidth: 20,
                            fontSize: 12,
                            right: -4,
                        },
                    }}
                >
                    {icon({ sx: { color: active || isActive ? Color?.PRIMARY : '#fff' } })}
                </Badge>
            </IconButton>
            <Typography
                variant="subtitle1"
                sx={{
                    color: active || isActive ? Color?.PRIMARY : '#fff',
                    textTransform: 'uppercase',
                    fontSize: 8,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
            >
                {title}
            </Typography>
        </Box>
    );
};

export default MobileNavButton;
