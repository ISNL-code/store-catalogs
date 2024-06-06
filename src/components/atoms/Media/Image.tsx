import { CircularProgress } from '@mui/material';
import { Color } from 'constants/colors';
import { useState } from 'react';
import CardMedia from '@mui/material/CardMedia';

const ImageComponent = ({ imageUrl }) => {
    const [imgLoaded, setImgLoaded] = useState(false);

    return (
        <div style={{ height: '100%', position: 'relative', width: '100%' }}>
            <CardMedia
                component="img"
                height="fit-content"
                image={imageUrl}
                alt="image"
                onLoad={event => {
                    setImgLoaded(!event?.bubbles);
                }}
                sx={{ opacity: imgLoaded ? 1 : 0 }}
            />
            <div style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)', position: 'absolute' }}>
                <CircularProgress
                    sx={{
                        color: Color?.PRIMARY,
                        opacity: imgLoaded ? 0 : 1,
                    }}
                    thickness={1}
                />
            </div>
        </div>
    );
};

export default ImageComponent;
