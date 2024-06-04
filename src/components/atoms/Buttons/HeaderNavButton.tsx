import { Badge, IconButton, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { Color, Colors } from 'constants/colors';

interface HeaderNavButtonInterface {
    icon: () => ReactNode;
    path?: string;
    childPath?: string[];
    isShown?: boolean;
    isActive?;
    action?;
    title?;
    badgeCount?: number;
}

const HeaderNavButton = ({
    icon,
    path,
    isShown = true,
    isActive,
    action,
    title = '',
    badgeCount = 0,
    childPath,
}: HeaderNavButtonInterface) => {
    const navigate = useNavigate();
    const location = useLocation();
    const active = location.pathname === path || childPath?.some(el => location.pathname.includes(el));

    if (isShown)
        return (
            <IconButton
                sx={{
                    mx: 0.1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: 70,
                    height: 40,
                    p: 0,
                    borderRadius: 2,
                    backgroundColor: active || isActive ? Colors?.WHITE : '',
                    '&:hover': { backgroundColor: Colors?.WHITE, opacity: active || isActive ? 1 : 0.75 },
                }}
                color={active || isActive ? `primary` : 'default'}
                onClick={e => {
                    if (action) action(e);
                    if (path) navigate(path);
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
