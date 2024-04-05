import IconButton from '@mui/material/IconButton';
import { Box, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import { Fragment, useState } from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import { useDevice } from 'hooks/useDevice';

const LanguageButton = ({
    setLang,
    string,
    lang,
    storeLanguages = [
        { code: 'ua' },
        { code: 'en' },
        { code: 'pl' },
        { code: 'cz' },
        { code: 'ru' },
        { code: 'es' },
        { code: 'fr' },
    ],
    setOpenModalType = _ => {},
}) => {
    const { sx } = useDevice();
    const [anchorElLang, setAnchorElLang] = useState(null);
    const open = Boolean(anchorElLang);

    const handleClick = event => {
        setAnchorElLang(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElLang(null);
    };
    const selectLangFlag = () => {
        return (
            <Box
                sx={{
                    position: 'absolute',
                    top: 4,
                    right: 5,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    height: 20,
                    width: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                }}
            >
                {lang?.code === 'ua' && (
                    <img style={{ height: 20 }} src={require(`assets/img/flags/ua.png`)} alt="Broken Img" />
                )}
                {lang?.code === 'pl' && (
                    <img style={{ height: 20 }} src={require(`assets/img/flags/pl.png`)} alt="Broken Img" />
                )}
                {lang?.code === 'cz' && (
                    <img style={{ height: 20 }} src={require(`assets/img/flags/cz.png`)} alt="Broken Img" />
                )}
                {lang?.code === 'en' && (
                    <img style={{ height: 20 }} src={require(`assets/img/flags/en.png`)} alt="Broken Img" />
                )}
                {lang?.code === 'ru' && (
                    <img style={{ height: 20 }} src={require(`assets/img/flags/ru.png`)} alt="Broken Img" />
                )}
                {lang?.code === 'fr' && (
                    <img style={{ height: 20 }} src={require(`assets/img/flags/fr.png`)} alt="Broken Img" />
                )}
                {lang?.code === 'es' && (
                    <img style={{ height: 20 }} src={require(`assets/img/flags/es.png`)} alt="Broken Img" />
                )}
            </Box>
        );
    };

    return (
        <Box>
            <IconButton
                onClick={e => {
                    handleClick(e);
                    setOpenModalType(null);
                }}
                id="lang-menu"
                aria-controls={open ? 'lang-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                sx={{
                    position: 'relative',
                    width: '50px',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': { backgroundColor: '#fff' },
                }}
            >
                <LanguageIcon />
                {sx && <Typography sx={{ fontSize: 10, color: 'rgba(0, 0, 0, 0.54)' }}>{string?.language}</Typography>}
                {selectLangFlag()}
            </IconButton>
            <Menu
                id="lang-menu"
                anchorEl={anchorElLang}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'lang-menu',
                }}
                sx={{ zIndex: 5000, position: 'fixed', top: 0, right: 0 }}
            >
                <Box sx={{ width: 200 }}>
                    <Box>
                        {storeLanguages?.map(({ code }) => {
                            let currentLabel = '';
                            switch (code) {
                                case 'ua':
                                    currentLabel = string?.ukrainian;
                                    break;
                                case 'en':
                                    currentLabel = string?.english;
                                    break;
                                case 'pl':
                                    currentLabel = string?.polish;
                                    break;
                                case 'cz':
                                    currentLabel = string?.czech;
                                    break;

                                case 'ru':
                                    currentLabel = string?.russian;
                                    break;
                                case 'es':
                                    currentLabel = string?.spanish;
                                    break;
                                case 'fr':
                                    currentLabel = string?.french;
                                    break;
                                default:
                                    currentLabel = string?.ukrainian;
                            }
                            return (
                                <Fragment key={code}>
                                    <MenuItem
                                        onClick={() => {
                                            setLang({ code, label: currentLabel });
                                            handleClose();
                                        }}
                                    >
                                        <Box
                                            mr={1}
                                            sx={{
                                                border: '1px solid #ffffff',
                                                borderRadius: '50%',
                                                overflow: 'hidden',
                                                height: 30,
                                                width: 30,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <img
                                                style={{ height: 30 }}
                                                src={require(`assets/img/flags/${code}.png`)}
                                                alt="Broken Img"
                                            />
                                        </Box>
                                        <ListItemText>{currentLabel}</ListItemText>
                                    </MenuItem>
                                </Fragment>
                            );
                        })}
                    </Box>
                </Box>
            </Menu>
        </Box>
    );
};

export default LanguageButton;
