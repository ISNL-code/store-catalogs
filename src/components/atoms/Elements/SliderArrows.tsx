import React from 'react';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { IconButton } from '@mui/material';
import { Colors } from 'constants/colors';

export const SamplePrevArrow: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <IconButton
        size="small"
        onClick={e => {
            e.stopPropagation();
            onClick();
        }}
        sx={{
            zIndex: 1,
            position: 'absolute',
            bottom: '50%',
            transform: 'translateY(50%)',
            left: 2,
            backgroundColor: Colors?.WHITE_10,
            width: 30,
            height: 30,
        }}
    >
        <ArrowLeftIcon sx={{ fontSize: 28 }} />
    </IconButton>
);

export const SampleNextArrow: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <IconButton
        size="small"
        onClick={e => {
            e.stopPropagation();
            onClick();
        }}
        sx={{
            zIndex: 1,
            position: 'absolute',
            bottom: '50%',
            transform: 'translateY(50%)',
            right: 2,
            backgroundColor: Colors?.WHITE_10,
            width: 30,
            height: 30,
        }}
    >
        <ArrowRightIcon sx={{ fontSize: 28 }} />
    </IconButton>
);
