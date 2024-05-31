import { useCategoriesApi } from 'api/useCategoriesApi';
import { useEffect, useState } from 'react';
import { CategoryDataInterface } from 'types/app_models';

interface Props {
    store: string;
    lang: string | null;
}

export const useCategory = ({ store, lang }: Props) => {
    const [categoriesList, setCategoriesList] = useState<CategoryDataInterface[]>([]);

    const { data: categoryRes } = useCategoriesApi().useGetAllCategories({
        store: store,
        lang: lang || 'en',
    });

    useEffect(() => {
        if (!categoryRes) return;
        setCategoriesList(
            categoryRes.data.categories?.map(category => ({
                depth: category.depth,
                id: category.id as any,
                parent: category.parent as any,
                children: category.children as any,
                description: category.description as any,
            }))
        );
    }, [categoryRes]);

    return { categoriesList };
};
