import { useQuery } from '@tanstack/react-query';

import useApi from './useApi';

export const useProductsTypesApi = () => {
    const { get, post, put, patch, remove } = useApi();

    const useGetAllProductsTypes = [
        {
            id: 100,
            code: 'outerwear',
            visible: true,
            allowAddToCart: true,
            description: {
                id: 2,
                language: 'ua',
                name: 'Верхнiй одяг',
                description: null,
                friendlyUrl: null,
                keyWords: null,
                highlights: null,
                metaDescription: null,
                title: null,
            },
        },
        {
            id: 101,
            code: 'belt',
            visible: true,
            allowAddToCart: true,
            description: {
                id: 3,
                language: 'ua',
                name: 'Ременi',
                description: null,
                friendlyUrl: null,
                keyWords: null,
                highlights: null,
                metaDescription: null,
                title: null,
            },
        },
        {
            id: 112,
            code: 'bags',
            visible: true,
            allowAddToCart: true,
            description: {
                id: 4,
                language: 'ua',
                name: 'Сумки',
                description: null,
                friendlyUrl: null,
                keyWords: null,
                highlights: null,
                metaDescription: null,
                title: null,
            },
        },
        {
            id: 102,
            code: 'shoes',
            visible: true,
            allowAddToCart: true,
            description: {
                id: 4,
                language: 'ua',
                name: 'Обув',
                description: null,
                friendlyUrl: null,
                keyWords: null,
                highlights: null,
                metaDescription: null,
                title: null,
            },
        },
        {
            id: 109,
            code: 'hats',
            visible: true,
            allowAddToCart: true,
            description: {
                id: 4,
                language: 'ua',
                name: 'Головні убори',
                description: null,
                friendlyUrl: null,
                keyWords: null,
                highlights: null,
                metaDescription: null,
                title: null,
            },
        },
    ];

    return {
        useGetAllProductsTypes,
    };
};
