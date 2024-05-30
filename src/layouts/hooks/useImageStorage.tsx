import { useState } from 'react';

const useImageStorage = () => {
    const [loadedImages, setLoadedImages] = useState<{ image: File | Blob; imageUrl: string }[]>([]);

    const handleSaveImage = (image: { file: File | Blob; imageUrl: string }) => {
        if (!image?.file || !image?.imageUrl) return;

        setLoadedImages(prevImages => {
            // Check if the image is already loaded
            const isImageLoaded = prevImages.some(img => img.imageUrl === image.imageUrl);
            if (isImageLoaded) {
                return prevImages;
            }
            return [...prevImages, { image: image.file, imageUrl: image.imageUrl }];
        });
    };

    return { loadedImages, handleSaveImage };
};

export default useImageStorage;
