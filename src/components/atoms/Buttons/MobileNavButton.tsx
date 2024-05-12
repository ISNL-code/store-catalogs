import { Badge, Box, IconButton, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface MobileNavButtonInterface {
    icon: (props) => ReactNode;
    path?: string;
    title: string;
    childPath?: string[];
    clearSort?;
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
    clearSort = () => {},
    action,
    isActive,
    badgeCount,
    protectedPath = false,
}: MobileNavButtonInterface) => {
    const navigate = useNavigate();
    const location = useLocation();

    const active = location.pathname === path || childPath?.some(child => location.pathname.includes(child));

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
            <IconButton
                onClick={() => {
                    if (active) return;
                    if (action) {
                        action();
                    }
                    if (!path) return;
                    if (!protectedPath) navigate(path);
                    clearSort();
                }}
                sx={{
                    width: 33,
                    height: 33,
                    border: '2px solid',
                    borderColor: active || isActive ? '#1976d2' : '#fff',
                    borderRadius: '12px',
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
                    {icon({ sx: { color: active || isActive ? '#1976d2' : '#fff' } })}
                </Badge>
            </IconButton>
            <Typography
                variant="subtitle1"
                sx={{ color: active || isActive ? '#1976d2' : '#fff', textTransform: 'uppercase', fontSize: 8 }}
            >
                {title}
            </Typography>
        </Box>
    );
};

export default MobileNavButton;
