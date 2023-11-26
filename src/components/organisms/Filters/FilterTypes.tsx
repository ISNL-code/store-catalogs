import { useOutletContext } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Fragment, useEffect, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { Backdrop, Box, Divider, List, ListItemText, MenuItem, SwipeableDrawer, Typography } from '@mui/material';
import { useDevice } from 'hooks/useDevice';
import FilterButton from 'components/molecules/ToolsButtons/FilterButton';
import { useProductsTypesApi } from 'api/useProductsTypesApi';
import { useIsMount } from 'hooks/useIsMount';

const FilterTypes = () => {
    const mount = useIsMount();
    const { string, setFilteredStores }: any = useOutletContext();
    const [queryTypes, setQueryTypes] = useState<any>([]);

    const { s } = useDevice();
    const [state, setState] = useState({
        top: false,
        left: false,
    });
    const [showFilters, setShowFilters] = useState(false);

    const productTypes = useProductsTypesApi().useGetAllProductsTypes;

    const toggleDrawer = (anchor, open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setShowFilters(open);
        setState({ ...state, [anchor]: open });
    };

    useEffect(() => {
        setFilteredStores(queryTypes);
    }, [queryTypes]);

    const TypeItem = ({ title, id }) => {
        const checked = queryTypes.find(el => el === id);

        return (
            <Box
                pl={3}
                pr={5}
                mb={s ? 0 : 1}
                onClick={() => {
                    if (checked) {
                        setQueryTypes(prev => [...prev.filter(el => el !== id)]);
                    } else {
                        setQueryTypes(prev => [...prev, id]);
                    }
                }}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    height: 35,
                    backgroundColor: '#fff',
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
                    <Box
                        sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: 'grey',
                            mb: 0.3,
                            mr: 1,
                        }}
                    ></Box>
                    <ListItemText>
                        <Typography sx={{ fontWeight: 500, fontSize: 16 }}>{title}</Typography>
                    </ListItemText>
                </MenuItem>

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
            </Box>
        );
    };

    const getProductTypes = types => {
        return types?.map(el => {
            return (
                <Fragment key={el.id}>
                    <TypeItem title={el.description.name} id={el.id} />
                </Fragment>
            );
        });
    };

    return (
        <Box>
            {[s ? 'top' : 'left'].map(anchor => (
                <Fragment key={anchor}>
                    <Box sx={{ position: 'relative' }}>
                        <FilterButton isShown={true} action={toggleDrawer(anchor, true)} />

                        {queryTypes.length > 0 && (
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
                        slotProps={{
                            backdrop: {
                                sx: {
                                    backgroundColor: 'rgba(131, 131, 131, 0.863)',
                                },
                            },
                        }}
                        sx={{
                            '.MuiList-root': {
                                p: 0,
                                mt: 1,
                            },
                            '.css-9emuhu-MuiPaper-root-MuiDrawer-paper': {
                                borderRadius: 8,
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 0,
                            },
                            zIndex: 4000,
                        }}
                    >
                        <Box px={3} py={1} sx={{ width: '100%', display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                            <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                sx={{ borderRadius: '16px' }}
                                onClick={() => {
                                    setState({ top: false, left: false });
                                }}
                            >
                                {string?.ready}
                            </Button>
                            <Button
                                disabled={!queryTypes.length}
                                variant="outlined"
                                color="primary"
                                size="small"
                                sx={{ borderRadius: '16px' }}
                                onClick={() => {
                                    setQueryTypes([]);
                                }}
                            >
                                {string?.clear}
                            </Button>
                        </Box>
                        <Divider />
                        <Box sx={{ width: anchor === 'top' ? '100vw' : '400px' }} role="presentation">
                            {showFilters && <List>{getProductTypes(productTypes)}</List>}
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

export default FilterTypes;
