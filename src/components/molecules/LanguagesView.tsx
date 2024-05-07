import { Box, Tooltip, Typography } from '@mui/material';

import { useOutletContext } from 'react-router-dom';

const LanguagesView = ({ supportedLanguages }) => {
    const { string }: any = useOutletContext();

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
            <Typography variant="h5" sx={{ color: 'grey' }}>
                {string?.languages}:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {supportedLanguages
                    .sort((a, b) => b.localeCompare(a))
                    .map(el => (
                        <Tooltip key={el} title={el}>
                            <Box
                                sx={{
                                    borderRadius: '50%',
                                    boxShadow: '0 0 3px 0.5px #00000045',
                                    height: 22,
                                    width: 22,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#ccc',
                                }}
                            >
                                <>
                                    {el === 'ua' && (
                                        <img
                                            style={{ height: 24 }}
                                            src={require(`assets/img/flags/ua.png`)}
                                            alt="Broken Img"
                                        />
                                    )}
                                    {el === 'pl' && (
                                        <img
                                            style={{ height: 24 }}
                                            src={require(`assets/img/flags/pl.png`)}
                                            alt="Broken Img"
                                        />
                                    )}
                                    {el === 'cz' && (
                                        <img
                                            style={{ height: 24 }}
                                            src={require(`assets/img/flags/cz.png`)}
                                            alt="Broken Img"
                                        />
                                    )}
                                    {el === 'en' && (
                                        <img
                                            style={{ height: 24 }}
                                            src={require(`assets/img/flags/en.png`)}
                                            alt="Broken Img"
                                        />
                                    )}
                                    {el === 'ru' && (
                                        <img
                                            style={{ height: 24 }}
                                            src={require(`assets/img/flags/ru.png`)}
                                            alt="Broken Img"
                                        />
                                    )}
                                    {el === 'fr' && (
                                        <img
                                            style={{ height: 24 }}
                                            src={require(`assets/img/flags/fr.png`)}
                                            alt="Broken Img"
                                        />
                                    )}
                                    {el === 'es' && (
                                        <img
                                            style={{ height: 24 }}
                                            src={require(`assets/img/flags/es.png`)}
                                            alt="Broken Img"
                                        />
                                    )}
                                    {el === 'kz' && (
                                        <img
                                            style={{ height: 24 }}
                                            src={require(`assets/img/flags/kz.png`)}
                                            alt="Broken Img"
                                        />
                                    )}
                                </>
                            </Box>
                        </Tooltip>
                    ))}
            </Box>
        </Box>
    );
};

export default LanguagesView;
