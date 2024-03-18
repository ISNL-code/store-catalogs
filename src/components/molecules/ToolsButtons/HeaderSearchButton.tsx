import { useEffect, useMemo, useRef, useState } from 'react';
import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import debounce from 'lodash.debounce';
import { useLocation, useOutletContext } from 'react-router-dom';
import { StoresContextInterface } from 'types';

const HeaderSearchButton = () => {
    const location = useLocation();
    const [showSearch, setShowSearch] = useState(false);
    const [value, setValue] = useState('');
    const { string, headerHeight, setSortedStores, appXPadding, sortedStores }: StoresContextInterface =
        useOutletContext();

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setValue('');
    }, [showSearch]);

    useEffect(() => {
        setShowSearch(false);
    }, [location]);

    const debouncedChangeHandler = useMemo(() => debounce(setSortedStores, 0), []);

    return (
        <>
            <Box
                sx={{
                    display: location.pathname === '/' || location.pathname === '/my-stores' ? 'inline' : 'none',
                    position: 'relative',
                }}
            >
                {sortedStores && (
                    <Box
                        sx={{
                            width: '10px',
                            height: '10px',
                            border: '1px solid red',
                            borderRadius: '50%',
                            backgroundColor: 'red',
                            position: 'absolute',
                            top: 5,
                            right: 5,
                            zIndex: 1,
                        }}
                    ></Box>
                )}
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
                    top: headerHeight,
                    left: 0,
                    zIndex: 5000,
                }}
                onClick={e => {
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
                        transition: 'height 150ms cubic-bezier(0.4, 0, 0.2, 1)',
                        marginLeft: 'auto',
                    }}
                >
                    <Box
                        onClick={e => {
                            e.stopPropagation();
                        }}
                        pl={2}
                        pr={appXPadding}
                        mt={0.6}
                        sx={{ display: 'flex', alignItems: 'center', maxWidth: 600, ml: 'auto' }}
                    >
                        {showSearch && (
                            <>
                                <TextField
                                    ref={inputRef}
                                    autoFocus={showSearch}
                                    value={value}
                                    onChange={event => {
                                        debouncedChangeHandler(event.target.value);
                                        setValue(event.target.value);
                                    }}
                                    onKeyUp={e => {
                                        const current = true;
                                        if (e.key === 'Enter' && current) {
                                            setShowSearch(false);
                                            setValue('');
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
                                    placeholder={string?.find_store_by_name}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment sx={{ cursor: 'pointer' }} position="end">
                                                <CloseIcon
                                                    onClick={() => {
                                                        setValue('');
                                                        setSortedStores('');
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
            </Box>
        </>
    );
};

export default HeaderSearchButton;
