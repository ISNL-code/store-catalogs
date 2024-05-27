import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from 'constants/routes';

import PAGE_401 from 'pages/TechPages/401';
import PAGE_403 from 'pages/TechPages/403';
import PAGE_404 from 'pages/TechPages/404';
import PAGE_500 from 'pages/TechPages/500';
import LandingLayout from 'layouts/Landing/LandingLayout';
import LandingHomePage from 'pages/LandingWebPage/LandingHomePage';

interface Props {
    lang: string;
    setLang;
}

const LandingModeRouting = ({ lang, setLang }: Props) => {
    return (
        <Router>
            <Routes>
                <>
                    <Route>
                        <Route path={`${ROUTES?.PAGE_401}`} element={<PAGE_401 />} />
                        <Route path={`${ROUTES?.PAGE_403}`} element={<PAGE_403 />} />
                        <Route path={`${ROUTES?.PAGE_404}`} element={<PAGE_404 />} />
                        <Route path={`${ROUTES?.PAGE_500}`} element={<PAGE_500 />} />
                    </Route>

                    <Route path={ROUTES?.LANDING} element={<LandingLayout lang={lang} setLang={setLang} />}>
                        <Route index path={`${ROUTES?.LANDING}/welcome`} element={<LandingHomePage />} />
                        <Route path="*" element={<Navigate to={ROUTES?.LANDING} replace />} />
                    </Route>
                </>
                <Route path="*" element={<Navigate to={ROUTES?.LANDING} replace />} />
            </Routes>
        </Router>
    );
};

export default LandingModeRouting;
