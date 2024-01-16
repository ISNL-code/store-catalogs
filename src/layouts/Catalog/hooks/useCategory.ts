import { useCategoriesApi } from 'api/useCategoriesApi';
import { useIsMount } from 'hooks/useIsMount';
import { useEffect, useState } from 'react';
import { CategoryInterface } from 'types';

export const useCategory = ({
    store,
    lang,
    currentProductsPage,
    handleSetProductsPage,
    setQueryCategories,
    queryCategories,
}) => {
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

    const handleCategoriesQuery = (data, checked, root, rootID) => {
        window.scrollTo({
            top: 0,
            behavior: 'auto',
        });
        if (root) {
            if (checked) {
                if (currentProductsPage > 0) {
                    handleSetProductsPage(0);
                    setQueryCategories(queryCategories.filter(el => !data.find(item => el !== item)));
                    return;
                }
                if (currentProductsPage === 0) {
                    setQueryCategories(queryCategories.filter(el => !data.find(item => el !== item)));
                    return;
                }
                return;
            }
            if (!checked) {
                if (!queryCategories.length && currentProductsPage > 0) {
                    handleSetProductsPage(0);
                    setQueryCategories(data);
                    return;
                }
                if (!queryCategories.length && currentProductsPage === 0) {
                    setQueryCategories(data);
                    return;
                }
                if (currentProductsPage > 0) {
                    handleSetProductsPage(0);
                    setQueryCategories([...queryCategories, ...data]);
                    return;
                }
                if (currentProductsPage === 0) {
                    setQueryCategories([...queryCategories, ...data]);
                    return;
                }
                return;
            }
        }
        if (!root) {
            if (checked) {
                if (currentProductsPage > 0) {
                    handleSetProductsPage(0);
                    setQueryCategories(queryCategories.filter(el => el !== data && el !== rootID));
                    return;
                }
                if (currentProductsPage === 0) {
                    setQueryCategories(queryCategories.filter(el => el !== data && el !== rootID));
                    return;
                }
                return;
            }
            if (!checked) {
                if (!queryCategories.length && currentProductsPage > 0) {
                    handleSetProductsPage(0);
                    setQueryCategories([data]);
                    return;
                }
                if (!queryCategories.length && currentProductsPage === 0) {
                    setQueryCategories([data]);
                    return;
                }
                if (currentProductsPage > 0) {
                    handleSetProductsPage(0);
                    setQueryCategories([...queryCategories, data]);
                    return;
                }
                if (currentProductsPage === 0) {
                    setQueryCategories([...queryCategories, data]);
                    return;
                }
                return;
            }
            return;
        }
    };

    return { categoriesList, handleCategoriesQuery };
};
