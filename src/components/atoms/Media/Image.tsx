import { CircularProgress } from '@mui/material';
import { Color } from 'constants/colors';
import { useState } from 'react';

const ImageComponent = ({ imageUrl }) => {
    const [imgLoaded, setImgLoaded] = useState(false);

    return (
        <div style={{ height: '100%', position: 'relative', width: '100%' }}>
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

            <CircularProgress
                sx={{
                    color: Color?.PRIMARY,
                    position: 'absolute',
                    top: 100,
                    left: '42%',
                    transform: 'translateX(-150%)',
                    opacity: imgLoaded ? 0 : 1,
                }}
                thickness={2}
            />
        </div>
    );
};

export default ImageComponent;
