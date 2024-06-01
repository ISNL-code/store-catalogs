import { useState } from 'react';

export interface UseImagesStorageInterface {
    savedImages: { image: Blob; imageUrl: string; localUrl: string }[];
    handleSaveImage: (image: { file: Blob; imageUrl: string }) => void;
}

const useImageStorage = (): UseImagesStorageInterface => {
    const [savedImages, setSavedImages] = useState<{ image: Blob; imageUrl: string; localUrl: string }[]>([]);

    const handleSaveImage = (image: { file: Blob; imageUrl: string }) => {
        if (!image?.file || !image?.imageUrl) return;

        setSavedImages(prevImages => {
            const isImageLoaded = prevImages.some(img => img.imageUrl === image.imageUrl);
            if (isImageLoaded) {
                return prevImages;
            }
            const localUrl = URL.createObjectURL(image.file);
            return [...prevImages, { image: image.file, imageUrl: image.imageUrl, localUrl }];
        });
    };

    return { savedImages, handleSaveImage };
};

export default useImageStorage;
