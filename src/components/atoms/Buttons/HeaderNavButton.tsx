import { Badge, Box, Button, IconButton, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useDevice } from 'hooks/useDevice';

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
    const { sx, sm } = useDevice();

    if (isShown)
        return (
            <>
                <Box mx={0.5}>
                    <Button
                        sx={{
                            px: sx ? 0 : 1,
                            gap: sx ? 0 : 1,
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: sx ? 'column' : 'row',
                            alignItems: 'center',
                            '&:hover': { backgroundColor: '#fff' },
                        }}
                        color={active || isActive ? `primary` : 'inherit'}
                        onClick={() => {
                            if (action) action();
                            clearSort();
                            if (!protectedPath && path) navigate(path);
                        }}
                        variant={sx ? 'text' : 'outlined'}
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
                            sx={{
                                fontSize: sx ? 10 : 14,
                                color: active || isActive ? '#1976d2' : 'rgba(0, 0, 0, 0.54)',
                                fontWeight: sx ? 500 : 700,
                            }}
                        >
                            {title}
                        </Typography>
                    </Button>
                </Box>
            </>
        );
    return null;
};

export default HeaderNavButton;
