import { ChangeEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Box, Divider, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useProductsApi } from 'api/useProductsApi';
import debounce from 'lodash.debounce';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { STORE_ROUTE } from 'router/routes';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { CatalogContextInterface } from 'types/outlet_context_models';

const SkuSearch = () => {
    const { STORE_CODE } = STORE_CONFIG;
    const navigate = useNavigate();
    const { storeCode } = useParams();
    const [value, setValue] = useState('');
    const [query, setQuery] = useState(null);
    const [matchedSku, setMatchedSku] = useState<any>([]);
    const [showSearch, setShowSearch] = useState(false);
    const { appXPadding, string, headerHeight, lang }: CatalogContextInterface = useOutletContext();
    const {
        data: productSkuRes,
        refetch: findSku,
        isFetching: loadMatched,
    } = useProductsApi().useGetProductBySku({ sku: query, storeCode, lang });
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!productSkuRes) return;

        setMatchedSku(
            productSkuRes?.data?.products
                ?.flatMap(item => {
                    return item.variants;
                })
                ?.map(({ sku, productId }) => {
                    return { sku, productId };
                })
        );
    }, [productSkuRes]);

    useEffect(() => {
        setValue('');
        setQuery(null);
        setMatchedSku([]);
    }, [showSearch]);

    useEffect(() => {
        if (!productSkuRes) return;
        if (!query) {
            setValue('');
            setQuery(null);
            setMatchedSku([]);
            return;
        }
        findSku(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    const debouncedChangeHandler = useMemo(() => debounce(setQuery, 1000), []);

    return (
        <>
            <Box>
                <IconButton
                    sx={{
                        height: 30,
                        width: 30,
                        backgroundColor: '#fff',
                        mr: '2px',
                        border: '1px solid rgba(0, 0, 0, 0.120)',
                    }}
                    onClick={() => {
                        setShowSearch(!showSearch);
                    }}
                >
                    <SearchIcon />
                </IconButton>
            </Box>
            <Box
                sx={{
                    height: showSearch ? '100vh' : 0,
                    position: 'fixed',
                    width: '100vw',
                    maxWidth: 600,
                    top: 50,
                    zIndex: 4002,
                    right: 0,
                }}
                onClick={() => {
                    setShowSearch(false);
                }}
            >
                <Box
                    onClick={e => {
                        e.stopPropagation();
                    }}
                    sx={{
                        height: showSearch ? `${headerHeight}px` : 0,
                        overflow: 'hidden',
                        transition: 'height 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                        marginLeft: 'auto',
                        maxWidth: 600,
                    }}
                >
                    <Box
                        onClick={e => {
                            e.stopPropagation();
                        }}
                        pl={2}
                        pr={appXPadding}
                        mt={0.75}
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        {showSearch && (
                            <>
                                <TextField
                                    ref={inputRef}
                                    autoFocus={showSearch}
                                    value={value}
                                    onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                                        debouncedChangeHandler(event.target.value);
                                        setValue(event.target.value);
                                    }}
                                    onKeyUp={(event: KeyboardEvent<EventTarget>) => {
                                        const current = matchedSku.find(
                                            item => item.sku === (event!.target as HTMLInputElement)?.value
                                        );
                                        if (event.key === 'Enter' && current) {
                                            setShowSearch(false);
                                            setValue('');
                                            setQuery(null);
                                            setMatchedSku([]);

                                            return navigate(
                                                STORE_ROUTE?.product(
                                                    STORE_CODE,
                                                    current?.productId,
                                                    current.sku.replaceAll('/', '_')
                                                )
                                            );
                                        }
                                    }}
                                    sx={{
                                        backgroundColor: '#fff',
                                        mr: 1,
                                        webkitUserSelect: 'input !important',
                                        mb: 2,
                                        '.MuiInputBase-root': {
                                            height: 32,
                                        },
                                    }}
                                    fullWidth
                                    size="small"
                                    placeholder={string?.find_by_vendor_code}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment sx={{ cursor: 'pointer' }} position="end">
                                                <CloseIcon
                                                    onClick={() => {
                                                        setValue('');
                                                        setMatchedSku([]);
                                                    }}
                                                    fontSize="small"
                                                />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <IconButton
                                    onClick={() => {
                                        setShowSearch(false);
                                        setValue('');
                                    }}
                                    size="small"
                                    sx={{
                                        border: '1px solid #ccc',
                                        width: 32,
                                        backgroundColor: '#fff',
                                        mb: 2,
                                        '&:hover': {
                                            backgroundColor: '#fff',
                                            opacity: 1,
                                        },
                                    }}
                                >
                                    <ArrowBackIosIcon sx={{ ml: 1 }} fontSize="small" />
                                </IconButton>
                            </>
                        )}
                    </Box>
                </Box>
                {loadMatched && (
                    <Box
                        onClick={e => {
                            e.stopPropagation();
                        }}
                        mt={-1}
                        mr={5 + appXPadding}
                        sx={{
                            zIndex: 2002,
                            display: showSearch ? 'block' : 'none',
                            height: showSearch ? 'fit-content' : 0,
                            backgroundColor: '#fff',
                            border: showSearch ? '1px solid #ccc' : '',
                            maxWidth: inputRef?.current?.offsetWidth,
                            transition: 'height 500ms cubic-bezier(0.4, 0, 0.2, 1)',
                            marginLeft: 'auto',
                            borderRadius: '8px',
                            overflow: 'hidden',
                        }}
                    >
                        <Box sx={{ display: showSearch ? 'block' : 'none' }}>
                            <Box
                                py={1}
                                px={2}
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: '#ebebebdc',
                                    },
                                }}
                            >
                                <Typography sx={{ color: '#ccc' }}>{string?.loading}...</Typography>
                            </Box>
                        </Box>
                    </Box>
                )}
                {!loadMatched && (
                    <Box
                        onClick={e => {
                            e.stopPropagation();
                        }}
                        mt={-1}
                        mr={5 + appXPadding}
                        sx={{
                            zIndex: 2002,
                            display: showSearch ? 'block' : 'none',
                            height: showSearch ? 'fit-content' : 0,
                            backgroundColor: '#fff',
                            border: showSearch ? '1px solid #ccc' : '',
                            maxWidth: inputRef?.current?.offsetWidth,
                            transition: 'height 500ms cubic-bezier(0.4, 0, 0.2, 1)',
                            marginLeft: 'auto',
                            borderRadius: '8px',
                            overflow: 'hidden',
                        }}
                    >
                        {!!matchedSku.length ? (
                            matchedSku.map((item, idx) => {
                                if (idx > 10) return null;
                                return (
                                    <Box key={idx} sx={{ display: showSearch ? 'block' : 'none' }}>
                                        <Box
                                            py={1}
                                            px={2}
                                            sx={{
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    backgroundColor: '#ebebebdc',
                                                },
                                            }}
                                            onClick={() => {
                                                navigate(
                                                    STORE_ROUTE?.product(
                                                        STORE_CODE,
                                                        item.productId,
                                                        item?.sku?.replaceAll('/', '_')
                                                    )
                                                );

                                                setShowSearch(false);
                                            }}
                                        >
                                            <Typography>{item.sku}</Typography>
                                        </Box>
                                        <Divider />
                                    </Box>
                                );
                            })
                        ) : (
                            <Box sx={{ display: showSearch ? 'block' : 'none' }}>
                                <Box
                                    py={1}
                                    px={2}
                                    sx={{
                                        cursor: 'pointer',
                                        '&:hover': {
                                            backgroundColor: '#ebebebdc',
                                        },
                                    }}
                                >
                                    <Typography sx={{ color: '#ccc' }}>{string?.no_results}</Typography>
                                </Box>
                            </Box>
                        )}
                    </Box>
                )}
            </Box>
        </>
    );
};

export default SkuSearch;
