import { useCategoriesApi } from 'api/useCategoriesApi';
import { useEffect, useState } from 'react';
import { CategoryInterface } from 'types';

interface Props {
    store;
    lang: string | null;
}

export const useCategory = ({ store, lang }: Props) => {
    const [categoriesList, setCategoriesList] = useState<CategoryInterface[] | []>([]);

    const { data: categoryRes } = useCategoriesApi().useGetAllCategories({
        store: store,
        lang: lang,
    });

    useEffect(() => {
        if (!categoryRes) return;
        setCategoriesList(
            categoryRes.data.categories?.map(category => {
                return {
                    depth: category.depth,
                    id: category.id,
                    parent: category.parent,
                    children: category.children,
                    description: category.description,
                };
            })
        );
    }, [categoryRes]);

    return { categoriesList };
};
