import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { Color } from 'constants/colors';

interface ImageComponentProps {
    imageUrl: string;
    wrapperHeight?: number | string;
    isActive?: boolean;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ imageUrl, wrapperHeight = '100%', isActive = true }) => {
    const [imgLoaded, setImgLoaded] = useState(false);
    const [visited, setVisited] = useState(false);

    useEffect(() => {
        if (!isActive) return;
        setVisited(true);
    }, [isActive]);

    return (
        <div
            style={{
                height: wrapperHeight,
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {visited && (
                <img
                    src={imageUrl}
                    style={{
                        width: '100%',
                        opacity: imgLoaded ? 1 : 0,
                        transition: 'opacity 0.25s ease-in-out',
                    }}
                    alt="Loading..."
                    onLoad={event => {
                        setImgLoaded(!event?.bubbles);
                    }}
                />
            )}
            {!imgLoaded && (
                <div
                    style={{
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: wrapperHeight,
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <CircularProgress
                        sx={{
                            color: Color.PRIMARY,
                        }}
                        thickness={1}
                    />
                </div>
            )}
        </div>
    );
};

export default ImageComponent;
