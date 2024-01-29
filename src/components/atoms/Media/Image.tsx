import { Box, CircularProgress } from '@mui/material';
import { useDevice } from 'hooks/useDevice';

import { useEffect, useRef, useState } from 'react';

const Image = ({ width, height, imgUrl, cropY = 0 }) => {
    const { xxs, xs, s, sm, sx, slx, m, mx, ls, l } = useDevice();
    const [imgHeight, setImgHeight] = useState<number>(0);
    const [screenWidth, setScreenWidth] = useState(0);
    const [loading, setLoading] = useState(true);

    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setImgHeight(ref?.current?.clientWidth ? (ref?.current?.clientWidth / width) * height : 0); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        window.addEventListener('orientationchange', event => {
            const w = event.target as Window;
            setScreenWidth(w.innerWidth);
        });
        window.addEventListener('resize', (event: UIEvent) => {
            const w = event.target as Window;
            setScreenWidth(w.innerWidth);
        }); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        window.innerWidth,

        xxs,
        xs,
        s,
        sm,
        sx,
        slx,
        m,
        mx,
        ls,
        l,
        ref?.current?.clientWidth,
        ref?.current?.clientHeight,
    ]);

    useEffect(() => {
        setTimeout(() => {
            setImgHeight(ref?.current?.clientWidth ? (ref?.current?.clientWidth / width) * height : 0);
            setLoading(false);
        }, 250); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screenWidth, loading, xxs, xs, s, sm, sx, slx, m, mx, ls, l]);

    return (
        <Box
            ref={ref}
            sx={{
                width: '100%',
                height: imgHeight - cropY,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
            }}
        >
            <Box sx={{ position: 'absolute', zIndex: -1, height: '100%', display: 'flex', alignItems: 'center' }}>
                <CircularProgress size={35} thickness={2} sx={{ color: '#757575' }} />
            </Box>
            <img src={imgUrl} style={{ width: '100%' }} alt="broken img" />
        </Box>
    );
};

export default Image;
