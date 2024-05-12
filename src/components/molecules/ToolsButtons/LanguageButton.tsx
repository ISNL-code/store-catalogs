import IconButton from '@mui/material/IconButton';
import { Box, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import { Fragment, useState } from 'react';
import LanguageIcon from '@mui/icons-material/Language';

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
    const selectLangFlag = () => {
        return (
            <Box
                sx={{
                    position: 'absolute',
                    top: -4,
                    right: 0,
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
                    position: 'relative',
                    width: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': { backgroundColor: '#ffffff0' },
                    p: 0,
                    mb: -0.25,
                }}
            >
                <LanguageIcon />
                <Typography sx={{ fontSize: 10, color: 'rgba(0, 0, 0, 0.54)' }}>{string?.language}</Typography>
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

                                default:
                                    currentLabel = string?.ukrainian;
                            }
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
