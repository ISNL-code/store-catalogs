import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { LANDING_ROUTE, ROUTES } from 'constants/routes';
import PAGE_401 from 'pages/TechPages/401';
import PAGE_403 from 'pages/TechPages/403';
import PAGE_404 from 'pages/TechPages/404';
import PAGE_500 from 'pages/TechPages/500';
import LandingLayout from 'layouts/Landing/LandingLayout';
import LandingHomePage from 'pages/LandingWebPage/LandingHomePage';
import LandingContacts from 'pages/LandingWebPage/LandingContacts';
import { useAppStorage } from 'hooks/useAppStorage';
import { LangResInterface, useGetLanguage } from 'hooks/useGetLanguage';
import { STORE_CONFIG } from 'store_constants/stores_config';

const LandingWebRouting = () => {
    const { STORE_NAME } = STORE_CONFIG;
    const { lang, setLang } = useAppStorage();
    const { currentLanguage }: LangResInterface = useGetLanguage({ lang, storeName: STORE_NAME });

    return (
        <Router>
            <Routes>
                <Route>
                    <Route path={`${ROUTES?.PAGE_401}`} element={<PAGE_401 />} />
                    <Route path={`${ROUTES?.PAGE_403}`} element={<PAGE_403 />} />
                    <Route path={`${ROUTES?.PAGE_404}`} element={<PAGE_404 />} />
                    <Route path={`${ROUTES?.PAGE_500}`} element={<PAGE_500 />} />

                    <Route
                        path={`${ROUTES?.LANDING}`}
                        element={<LandingLayout lang={lang} setLang={setLang} currentLanguage={currentLanguage} />}
                    >
                        <Route path={`${ROUTES?.LANDING}/welcome`} element={<LandingHomePage />} />
                        <Route path={`${ROUTES?.LANDING}/contacts`} element={<LandingContacts />} />
                        <Route path="*" element={<Navigate to={LANDING_ROUTE?.root()} replace />} />
                    </Route>
                </Route>
                <Route path="*" element={<Navigate to={LANDING_ROUTE?.root()} replace />} />
            </Routes>
        </Router>
    );
};

export default LandingWebRouting;
