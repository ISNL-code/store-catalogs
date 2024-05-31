import { Box } from '@mui/material';
import LanguageButton from 'components/molecules/ToolsButtons/LanguageButton';
import HeaderLogo from 'components/atoms/Logo/HeaderLogo';
import { Color, Colors } from 'constants/colors';
import { STORE_CONFIG } from 'store_constants/stores_config';

interface HeaderInterface {
    headerHeight: number;
    appXPadding: number;
    string;
    lang;
    setLang;
    logo;
    store;
}

const HomeHeader = ({ headerHeight, appXPadding, string, lang, setLang, logo, store }: HeaderInterface) => {
    const { OPTIONS, STORE_NAME } = STORE_CONFIG;
    const { CUSTOM_LOGO } = OPTIONS;

    return (
        <Box
            px={appXPadding}
            sx={{
                height: `${headerHeight}px`,
                borderBottom: '1px solid',
                borderColor: Colors?.GRAY_300,
                position: 'fixed',
                width: '100%',
                left: 0,
                top: 0,
                zIndex: 4000,
                backgroundColor: Color?.PRIMARY_LIGHT,
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    height: `${headerHeight}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <HeaderLogo title={STORE_NAME} imgUrl={logo} custom={CUSTOM_LOGO} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LanguageButton
                        setLang={setLang}
                        string={string}
                        lang={lang}
                        storeLanguages={store?.supportedLanguages?.map(el => {
                            return el?.code;
                        })}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default HomeHeader;
