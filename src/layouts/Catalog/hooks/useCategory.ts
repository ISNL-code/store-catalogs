import { useCategoriesApi } from 'api/useCategoriesApi';
import { useIsMount } from 'hooks/useIsMount';
import { useEffect, useState } from 'react';
import { CategoryInterface } from 'types';

export const useCategory = ({ store, lang }) => {
    const mount = useIsMount();
    const [categoriesList, setCategoriesList] = useState<CategoryInterface | []>([]);

    const { data: categoryRes, refetch: updateCategories } = useCategoriesApi().useGetAllCategories({
        store: store,
        lang: lang?.code,
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

    useEffect(() => {
        if (mount) return;
        updateCategories();
    }, [lang]);

    return { categoriesList };
};
