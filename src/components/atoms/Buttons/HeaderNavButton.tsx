import { Badge, IconButton, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { Color, Colors } from 'colors';

interface HeaderNavButtonInterface {
    icon: () => ReactNode;
    path?: string;
    childPath?: string[];
    isShown?: boolean;
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
    isActive,
    action,
    title = '',
    badgeCount = 0,
    protectedPath = false,
    childPath,
}: HeaderNavButtonInterface) => {
    const navigate = useNavigate();
    const location = useLocation();
    const active = location.pathname === path || childPath?.some(el => location.pathname.includes(el));

    if (isShown)
        return (
            <IconButton
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: 70,
                    height: 50,
                    borderRadius: 4,
                    '&:hover': { backgroundColor: Colors?.WHITE },
                }}
                color={active || isActive ? `primary` : 'default'}
                onClick={e => {
                    if (action) action(e);
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
                    sx={{
                        fontSize: 10,
                        color: active || isActive ? Color?.PRIMARY : 'rgba(0, 0, 0, 0.54)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {title}
                </Typography>
            </IconButton>
        );
    return null;
};

export default HeaderNavButton;
