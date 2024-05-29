import React from 'react';
import { Box, Typography, Stepper, Step, StepLabel, useMediaQuery, useTheme } from '@mui/material';
import { Color, Colors } from 'colors';

const steps = ['Планирование', 'Дизайн и разработка', 'Тестирование', 'Запуск и продвижение', 'Поддержка и обновления'];

const stepDescriptions = [
    'Обсуждение целей и требований, создание технического задания.',
    'Создание дизайна и разработка функционала интернет-магазина.',
    'Проведение тестирования и устранение ошибок.',
    'Запуск сайта и его продвижение в поисковых системах и соцсетях.',
    'Поддержка, обновление и расширение функционала.',
];

const CreateSteps: React.FC = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ width: '100%', py: 4, px: 2, backgroundColor: Color?.SECONDARY_LIGHT }}>
            <Typography variant="h4" align="center" gutterBottom color={Color?.PRIMARY}>
                Шаги создания и продвижения
            </Typography>
            <Stepper
                activeStep={-1}
                orientation={isSmallScreen ? 'vertical' : 'horizontal'}
                sx={{ px: { xs: 1, sm: 6 }, py: 4, bgcolor: Colors?.WHITE, borderRadius: 2 }}
            >
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>
                            <Typography variant="h6" color={Color?.SECONDARY}>
                                {label}
                            </Typography>
                            <Typography variant="body2" color={Color?.SECONDARY}>
                                {stepDescriptions[index]}
                            </Typography>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

export default CreateSteps;
