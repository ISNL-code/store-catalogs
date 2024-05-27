import { Box } from '@mui/material';
import LanguageButton from 'components/molecules/ToolsButtons/LanguageButton';
import { Colors } from 'colors';
import LandingLogo from 'components/atoms/Logo/LandingLogo';

interface HeaderInterface {
    headerHeight: number;
    appXPadding: number;
    string;
    lang;
    setLang;
}

const LandingHeader = ({ headerHeight, appXPadding, string, lang, setLang }: HeaderInterface) => {
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
                backgroundColor: Colors?.WHITE,
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
                    <LandingLogo />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LanguageButton
                        setLang={setLang}
                        string={string}
                        lang={lang}
                        storeLanguages={[{ code: 'en' }, { code: 'pl' }, { code: 'ua' }, { code: 'ru' }].map(el => {
                            return el?.code;
                        })}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default LandingHeader;
