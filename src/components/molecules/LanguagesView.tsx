import { Box, Tooltip } from '@mui/material';

// import { useOutletContext } from 'react-router-dom';

const LanguagesView = ({ supportedLanguages }) => {
    // const { string }: any = useOutletContext();

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
            {/* <Typography variant="h5" sx={{ color: 'grey' }}>
                {string?.languages}:
            </Typography> */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {supportedLanguages
                    .sort((a, b) => b.localeCompare(a))
                    .map(el => (
                        <Tooltip key={el} title={el} placement="left">
                            <Box
                                sx={{
                                    borderRadius: '50%',
                                    boxShadow: '0 0 3px 0.5px #00000045',
                                    height: 26,
                                    width: 26,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#ccc',
                                }}
                            >
                                <>
                                    {el.toLowerCase() === 'ua' && (
                                        <img
                                            style={{ height: 28 }}
                                            src={require(`assets/img/flags/ua.png`)}
                                            alt="Broken Img"
                                        />
                                    )}
                                    {el.toLowerCase() === 'pl' && (
                                        <img
                                            style={{ height: 28 }}
                                            src={require(`assets/img/flags/pl.png`)}
                                            alt="Broken Img"
                                        />
                                    )}
                                    {el.toLowerCase() === 'cz' && (
                                        <img
                                            style={{ height: 28 }}
                                            src={require(`assets/img/flags/cz.png`)}
                                            alt="Broken Img"
                                        />
                                    )}
                                    {el.toLowerCase() === 'en' && (
                                        <img
                                            style={{ height: 28 }}
                                            src={require(`assets/img/flags/en.png`)}
                                            alt="Broken Img"
                                        />
                                    )}
                                    {el.toLowerCase() === 'ru' && (
                                        <img
                                            style={{ height: 28 }}
                                            src={require(`assets/img/flags/ru.png`)}
                                            alt="Broken Img"
                                        />
                                    )}
                                    {el.toLowerCase() === 'fr' && (
                                        <img
                                            style={{ height: 28 }}
                                            src={require(`assets/img/flags/fr.png`)}
                                            alt="Broken Img"
                                        />
                                    )}
                                    {el.toLowerCase() === 'es' && (
                                        <img
                                            style={{ height: 28 }}
                                            src={require(`assets/img/flags/es.png`)}
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
