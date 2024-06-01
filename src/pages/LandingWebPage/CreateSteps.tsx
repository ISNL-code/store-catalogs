import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import SettingsIcon from '@mui/icons-material/Settings';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import { useDevice } from 'hooks/useDevice';
import { Box, Typography } from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const steps = ['Заявка', 'Настройка', 'Запуск', 'Продвижение'];

export default function CreateSteps() {
    const { sx } = useDevice();

    const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
            top: sx ? 22 : 50,
        },
        [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                backgroundImage: 'linear-gradient( rgb(33, 165, 242) 0%, rgb(64, 137, 233) 50%, rgb(23, 13, 116) 100%)',
            },
        },
        [`&.${stepConnectorClasses.completed}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                backgroundImage:
                    'linear-gradient(  rgb(33, 165, 242) 0%, rgb(64, 137, 233) 50%, rgb(23, 13, 116) 100%)',
            },
        },
        [`& .${stepConnectorClasses.line}`]: {
            height: sx ? 3 : 4,
            border: 0,
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
            borderRadius: 1,
        },
    }));

    const ColorlibStepIconRoot = styled('div')<{
        ownerState: { completed?: boolean; active?: boolean };
    }>(({ theme, ownerState }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
        zIndex: 1,
        color: '#fff',
        width: sx ? 50 : 100,
        height: sx ? 50 : 100,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        ...(ownerState.active && {
            backgroundImage:
                'linear-gradient( 136deg, rgb(33, 165, 242) 0%, rgb(64, 137, 233) 50%, rgb(23, 13, 116) 100%)',
            boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        }),
        ...(ownerState.completed && {
            backgroundImage:
                'linear-gradient( 136deg, rgb(33, 165, 242) 0%, rgb(64, 137, 233) 50%, rgb(23, 13, 116) 100%)',
        }),
    }));

    function ColorlibStepIcon(props: StepIconProps) {
        const { active, completed, className } = props;

        const icons: { [index: string]: React.ReactElement } = {
            1: <TouchAppIcon sx={{ fontSize: sx ? 24 : 40 }} />,
            2: <SettingsIcon sx={{ fontSize: sx ? 24 : 40 }} />,
            3: <FlagIcon sx={{ fontSize: sx ? 24 : 40 }} />,
            4: <TrendingUpIcon sx={{ fontSize: sx ? 24 : 40 }} />,
        };

        return (
            <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
                {icons[String(props.icon)]}
            </ColorlibStepIconRoot>
        );
    }

    return (
        <Stack sx={{ width: '100%', my: 4 }} spacing={4}>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
                <Typography sx={{ fontSize: sx ? 28 : 36, fontWeight: 700, px: 4, letterSpacing: 0 }}>
                    Создать интернет-каталог — 4 простых шага шага
                </Typography>
            </Box>
            <Stepper alternativeLabel activeStep={3} connector={<ColorlibConnector />}>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
}
