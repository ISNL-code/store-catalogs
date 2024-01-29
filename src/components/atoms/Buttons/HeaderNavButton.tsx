import { Badge, Box, IconButton, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface HeaderNavButtonInterface {
    icon: () => ReactNode;
    path?: string;
    childPath?: string[];
    isShown?: boolean;
    clearSort?;
    isActive?;
    action?;
    title?;
    badgeCount?: number;
    protectedPath?: boolean;
}

const HeaderNavButton = ({
    icon,
    path,
    isShown = true,
    clearSort = () => {},
    isActive,
    action,
    title = '',
    badgeCount = 0,
    protectedPath = false,
}: HeaderNavButtonInterface) => {
    const navigate = useNavigate();
    const location = useLocation();
    const active = location.pathname === path;

    if (isShown)
        return (
            <>
                <Box>
                    <IconButton
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            '&:hover': { backgroundColor: '#fff' },
                        }}
                        color={active || isActive ? `primary` : 'default'}
                        onClick={() => {
                            if (action) action();
                            clearSort();
                            if (!protectedPath && path) navigate(path);
                        }}
                    >
                        <Badge
                            color="error"
                            badgeContent={badgeCount}
                            sx={{
                                '.MuiBadge-badge': {
                                    width: 16,
                                    height: 16,
                                    minWidth: 16,
                                    fontSize: 12,
                                    top: 3,
                                },
                            }}
                        >
                            {icon()}
                        </Badge>
                        <Typography
                            sx={{ fontSize: 10, color: active || isActive ? '#1976d2' : 'rgba(0, 0, 0, 0.54)' }}
                        >
                            {title}
                        </Typography>
                    </IconButton>
                </Box>
            </>
        );
    return null;
};

export default HeaderNavButton;
