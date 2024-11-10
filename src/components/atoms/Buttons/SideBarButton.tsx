import { Box, Fab, Typography } from '@mui/material';
import { useDevice } from 'hooks/useDevice';
import { Colors } from 'constants/colors';
import { useState } from 'react';

interface Props {
    action;
    color;
    positionRight;
    positionBottom;
    title;
    icon;
}

const SideBarButton = ({ action, color, positionRight, positionBottom, title, icon }: Props) => {
    const { sx } = useDevice();

    const [isHovered, setIsHovered] = useState(false);

    return (
        <Box
            sx={{
                width: isHovered && !sx ? 100 : 40,
                minWidth: 'fit-content',
                zIndex: 2000,
                position: 'fixed',
                right: positionRight,
                bottom: positionBottom,
                background: color,
                border: 'none',
                borderColor: isHovered && !sx ? color : 'none',
                backgroundColor: 'none',
                opacity: 0.75,
                borderRadius: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                cursor: 'pointer',
                transition: 'all 250ms cubic-bezier(1, 0.7, 0.2, 1)',
                overflow: 'hidden', // Скрывает текст до увеличения ширины
                paddingRight: 0,
                boxShadow: isHovered ? 'none' : `0 0 5px 2px ${color}`,
            }}
            onClick={() => {
                action();
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered && !sx && (
                <Typography
                    px={1}
                    m={0.4}
                    sx={{
                        fontSize: 12,
                        fontWeight: '700',
                        color: '#fff',
                        minWidth: 80,
                        textAlign: 'center',
                        whiteSpace: 'nowrap', // Чтобы текст не переносился
                        transition: 'transform 250ms ease', // Плавное появление текста
                    }}
                >
                    {title}
                </Typography>
            )}
            <Box>
                <Fab
                    size={'medium'}
                    sx={{
                        backgroundColor: Colors?.WHITE,
                        border: '1px solid #ccc',
                        boxShadow: `0 0 5px 2px ${color}`,
                        height: 40,
                        width: 40,
                        transition: 'transform 250ms ease', // Плавный переход для кнопки
                    }}
                >
                    {icon}
                </Fab>
            </Box>
        </Box>
    );
};

export default SideBarButton;
