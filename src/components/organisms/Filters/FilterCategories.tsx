import { useOutletContext } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import {
    Backdrop,
    Box,
    List,
    ListItemText,
    MenuItem,
    SwipeableDrawer,
    Typography,
    IconButton,
    Button,
} from '@mui/material';
import { useDevice } from 'hooks/useDevice';
import FilterButton from 'components/molecules/ToolsButtons/FilterButton';
import { Color, Colors } from 'constants/colors';
import { CatalogContextInterface } from 'types/outlet_context_models';
import isEqual from 'lodash/isEqual';
import CloseIcon from '@mui/icons-material/Close';

const FilterCategories = ({ isShown }) => {
    const { string, categoriesList, queryCategories, setQueryCategories }: CatalogContextInterface = useOutletContext();
    const [filters, setFilters] = useState<any>([]);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        setFilters(queryCategories);
    }, [showFilters]); // eslint-disable-line

    const handleCategoriesQuery = (data, checked, root, rootID) => {
        if (root) {
            if (checked) {
                return setFilters(filters.filter(el => !data.find(item => el !== item)));
            }
            if (!checked) {
                return setFilters([...filters, ...data]);
            }
        }
        if (!root) {
            if (checked) {
                return setFilters(filters.filter(el => el !== data && el !== rootID));
            }
            if (!checked) {
                return setFilters([...filters, data]);
            }
            return;
        }
    };

    const { s } = useDevice();
    const [state, setState] = useState({
        top: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setShowFilters(open);
        setState({ ...state, [anchor]: open });
    };

    const CategoryItem = ({ title, depth, id, root, children, rootID }) => {
        const checked = filters?.find(el => el === id);
        const checkedAll = children.every(({ id }) => filters?.find(el => el === id));

        return (
            <Box
                px={2}
                mb={s ? 0 : 1}
                onClick={() => {
                    if (!root) {
                        if (!checked) return handleCategoriesQuery(id, false, false, rootID);
                        if (checked) return handleCategoriesQuery(id, true, false, rootID);
                    }
                    if (root) {
                        if (!checked) {
                            return handleCategoriesQuery([...children.map(({ id }) => id), id], false, true, rootID);
                        }

                        if (checked) {
                            return handleCategoriesQuery([...children.map(({ id }) => id), id], true, true, rootID);
                        }
                    }
                }}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    height: 35,
                    border: depth ? 'none' : '1px solid #cccccc86',
                    backgroundColor: depth ? '#fff' : '#f5f5f57e',
                    '&:hover': {
                        py: ' 0 !important',
                        overflow: 'hidden !important',
                        width: '100% !important',
                    },
                }}
            >
                <MenuItem
                    hidden
                    sx={{
                        flexGrow: 1,
                        cursor: 'pointer',

                        height: 25,
                    }}
                >
                    {depth > 0 && (
                        <Box
                            sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                background: 'grey',
                                mb: 0.3,
                            }}
                        ></Box>
                    )}
                    <ListItemText sx={{ ml: depth }}>
                        <Typography sx={{ fontWeight: depth ? 500 : 700, fontSize: depth ? 16 : 18 }}>
                            {title}
                        </Typography>
                    </ListItemText>
                </MenuItem>
                {depth > 0 && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 25,
                            height: 25,
                            border: '1px solid #ccc',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            background: checked
                                ? `linear-gradient(135deg, green 50%, #ffffff) padding-box, linear-gradient(90deg, #a3a3a3, #b8b8b8) border-box`
                                : `linear-gradient(135deg, white 50%, #ffffff) padding-box, linear-gradient(90deg, #a3a3a3, #b8b8b8) border-box`,
                        }}
                    >
                        {checked && <CheckIcon fontSize="small" sx={{ color: '#ffffff' }} />}
                    </Box>
                )}
                {depth === 0 && (
                    <>
                        <Box
                            mr={-0.2}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 27,
                                height: 27,
                                border: '1px solid #ccc',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                background: checkedAll
                                    ? `linear-gradient(135deg, ${Color?.PRIMARY} 50%, #ffffff) padding-box, linear-gradient(90deg, #a3a3a3, #b8b8b8) border-box`
                                    : `linear-gradient(135deg, white 50%, #ffffff) padding-box, linear-gradient(90deg, #a3a3a3, #b8b8b8) border-box`,
                            }}
                        >
                            {checkedAll && <CheckIcon fontSize="small" sx={{ color: '#ffffff' }} />}
                        </Box>
                    </>
                )}
            </Box>
        );
    };

    const getCategories = categories => {
        return categories
            ?.sort((a, b) => a.description.title.localeCompare(b.description.title)) // Сортируем по title
            .map(el => {
                return (
                    <Fragment key={el.id}>
                        <CategoryItem
                            title={el.description.title}
                            depth={el.depth}
                            id={el.id}
                            root={!el.parent}
                            children={el.children}
                            rootID={el.parent?.id}
                        />
                        {!!el.children.length && getCategories(el.children)}
                    </Fragment>
                );
            });
    };

    if (!isShown) return null;

    return (
        <Box>
            {[s ? 'top' : 'right'].map(anchor => (
                <Fragment key={anchor}>
                    <Box sx={{ position: 'relative' }}>
                        <FilterButton isShown={true} action={toggleDrawer(anchor, true)} />
                        {Boolean(queryCategories?.length) && (
                            <Box
                                sx={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: '50%',
                                    background: 'red',
                                    position: 'absolute',
                                    top: '5px',
                                    right: '5px',
                                }}
                            ></Box>
                        )}
                    </Box>
                    <SwipeableDrawer
                        anchor={anchor as any}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                        slots={{ backdrop: Backdrop }}
                        sx={{
                            '.MuiList-root': {
                                p: 0,
                            },
                            '.css-9emuhu-MuiPaper-root-MuiDrawer-paper': {
                                borderRadius: 8,
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 0,
                            },
                            zIndex: 4000,
                        }}
                    >
                        <Box
                            px={2}
                            py={1}
                            sx={{
                                width: '100%',
                                display: 'flex',
                                gap: 1,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="medium"
                                    sx={{ borderRadius: '16px' }}
                                    onClick={e => {
                                        e?.stopPropagation();
                                        setState({ top: false, right: false });
                                        setShowFilters(false);
                                        setQueryCategories(filters);
                                    }}
                                    disabled={isEqual(filters, queryCategories)}
                                >
                                    {string?.submit}
                                </Button>
                                <Button
                                    disabled={!filters?.length}
                                    variant="outlined"
                                    color="primary"
                                    size="medium"
                                    sx={{ borderRadius: '16px' }}
                                    onClick={() => {
                                        setQueryCategories(_ => {
                                            return [];
                                        });
                                        setState({ top: false, right: false });
                                        setShowFilters(false);
                                        setQueryCategories([]);
                                        setFilters([]);
                                    }}
                                >
                                    {string?.clear}
                                </Button>
                            </Box>
                            <Box>
                                <IconButton
                                    sx={{
                                        backgroundColor: Color?.SECONDARY,
                                        '&:hover': { backgroundColor: Color?.SECONDARY },
                                        width: 26,
                                        height: 26,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        border: `1px solid ${Colors?.GRAY}`,
                                    }}
                                    onClick={() => {
                                        setState({ top: false, right: false });
                                        setShowFilters(false);
                                    }}
                                >
                                    <CloseIcon sx={{ fontSize: 16, color: Colors?.WHITE }} />
                                </IconButton>
                            </Box>
                        </Box>

                        <Box sx={{ minWidth: anchor === 'top' ? '100vw' : '300px' }} role="presentation">
                            {categoriesList?.length ? (
                                showFilters && <List>{getCategories(categoriesList)}</List>
                            ) : (
                                <Box p={1} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                    <Typography variant="h4" sx={{ color: 'gray' }}>
                                        {string?.no_categories_available}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                        {s && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    height: '55px',
                                    alignItems: 'baseline',
                                }}
                            >
                                <Box
                                    mt={4}
                                    sx={{
                                        width: 100,
                                        height: 6,
                                        backgroundColor: '#ccc',
                                        borderRadius: 4,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'baseline',
                                    }}
                                ></Box>
                            </Box>
                        )}
                    </SwipeableDrawer>
                </Fragment>
            ))}
        </Box>
    );
};

export default FilterCategories;
