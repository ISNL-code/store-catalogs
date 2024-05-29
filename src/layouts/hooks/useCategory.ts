import { useCategoriesApi } from 'api/useCategoriesApi';
import { useIsMount } from 'hooks/useIsMount';
import { useEffect, useState } from 'react';
import { CategoryInterface } from 'types';

interface Props {
    store;
    lang: string | null;
}

export const useCategory = ({ store, lang }: Props) => {
    const mount = useIsMount();
    const [categoriesList, setCategoriesList] = useState<CategoryInterface[] | []>([]);

    const { data: categoryRes, refetch: updateCategories } = useCategoriesApi().useGetAllCategories({
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

    useEffect(() => {
        if (mount) return;
        updateCategories(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lang]);

    return { categoriesList };
};
