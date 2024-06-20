import { CircularProgress } from '@mui/material';
import { Color } from 'constants/colors';
import { useState } from 'react';

const ImageComponent = ({ imageUrl, wrapperHeight = '100%' }: { imageUrl; wrapperHeight? }) => {
    const [imgLoaded, setImgLoaded] = useState(false);

    return (
        <div
            style={{
                height: wrapperHeight,
                width: '100%',
                flexGrow: 1,
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <img
                src={imageUrl}
                style={{
                    width: '100%',
                    opacity: imgLoaded ? 1 : 0,
                }}
                alt="Loading..."
                onLoad={event => {
                    setImgLoaded(!event?.bubbles);
                }}
            />
            {!imgLoaded && (
                <div
                    style={{
                        height: wrapperHeight,
                        width: '100%',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%,-50%)',
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <CircularProgress
                        sx={{
                            position: 'static',
                            color: Color?.PRIMARY,
                            opacity: imgLoaded ? 0 : 1,
                        }}
                        thickness={1}
                    />
                </div>
            )}
        </div>
    );
};

export default ImageComponent;
