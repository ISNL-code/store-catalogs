import IconButton from '@mui/material/IconButton';
import { Box, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import { Fragment, useState } from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import { Color, Colors } from 'constants/colors';

interface Props {
    setLang;
    string;
    lang: string | null;
    storeLanguages?: string[];
}

const LanguageButton = ({
    setLang,
    string,
    lang,
    storeLanguages = ['ua', 'en', 'kz', 'pl', 'cz', 'ru', 'es', 'fr'],
}: Props) => {
    const [anchorElLang, setAnchorElLang] = useState(null);
    const open = Boolean(anchorElLang);

    const handleClick = event => {
        setAnchorElLang(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElLang(null);
    };

    const getFlagSrc = code => {
        try {
            return require(`assets/img/flags/${code.toLowerCase()}.png`);
        } catch (error) {
            return require('assets/img/flags/en.png');
        }
    };

    const selectLangFlag = () => {
        return (
            <Box
                sx={{
                    position: 'absolute',
                    top: -2,
                    right: 6,
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
                {lang === 'ua' && (
                    <img style={{ height: 20 }} src={require(`assets/img/flags/ua.png`)} alt="Broken Img" />
                )}
                {lang === 'pl' && (
                    <img style={{ height: 20 }} src={require(`assets/img/flags/pl.png`)} alt="Broken Img" />
                )}
                {lang === 'cz' && (
                    <img style={{ height: 20 }} src={require(`assets/img/flags/cz.png`)} alt="Broken Img" />
                )}
                {lang === 'en' && (
                    <img style={{ height: 20 }} src={require(`assets/img/flags/en.png`)} alt="Broken Img" />
                )}
                {lang === 'ru' && (
                    <img style={{ height: 20 }} src={require(`assets/img/flags/ru.png`)} alt="Broken Img" />
                )}
                {lang === 'fr' && (
                    <img style={{ height: 20 }} src={require(`assets/img/flags/fr.png`)} alt="Broken Img" />
                )}
                {lang === 'es' && (
                    <img style={{ height: 20 }} src={require(`assets/img/flags/es.png`)} alt="Broken Img" />
                )}
                {lang === 'kz' && (
                    <img style={{ height: 20 }} src={require(`assets/img/flags/kz.png`)} alt="Broken Img" />
                )}
            </Box>
        );
    };

    return (
        <Box>
            <IconButton
                onClick={e => {
                    handleClick(e);
                }}
                id="lang-menu"
                aria-controls={open ? 'lang-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                sx={{
                    ml: 0.1,
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    width: 55,
                    height: 40,
                    borderRadius: 2,
                    '&:hover': { backgroundColor: Colors?.WHITE },
                }}
            >
                <LanguageIcon sx={{ fontSize: 24, color: open ? Color?.PRIMARY : 'rgba(0, 0, 0, 0.54)' }} />
                <Typography color="gray" sx={{ fontSize: 10, color: open ? Color?.PRIMARY : 'rgba(0, 0, 0, 0.54)' }}>
                    {string?.language}
                </Typography>
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
                sx={{ zIndex: 5000 }}
            >
                <Box sx={{ width: 200 }}>
                    <Box>
                        {storeLanguages?.map(code => {
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
                                case 'kz':
                                    currentLabel = string?.kazakh;
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
                                case 'it':
                                    currentLabel = string?.italian;
                                    break;
                                case 'tk':
                                    currentLabel = string?.turkish;
                                    break;
                                case 'de':
                                    currentLabel = string?.german;
                                    break;

                                default:
                                    currentLabel = string?.lang_unknown;
                            }

                            const flagSrc = getFlagSrc(code);

                            return (
                                <Fragment key={code}>
                                    <MenuItem
                                        onClick={() => {
                                            setLang(code);
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
                                            <img style={{ height: 30 }} src={flagSrc} alt="Flag" />
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
