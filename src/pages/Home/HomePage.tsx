import { Box } from '@mui/material';
import { useState } from 'react';
import Form from './Form';
import CallBackButton from 'components/atoms/Buttons/CallBackButton';
import SuccessModel from './SuccessModel';
import Hero from './Hero';
import Slides from './Slides';
import Advantages from './Advantages';
import Examples from './Examples';
import Pricing from './Pricing';

const HomePage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [plan, setPlan] = useState({ plan: '', subject: '' });
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <Box>
                <Form
                    values={{ ...plan }}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    setOpenModal={setOpenModal}
                    setPlan={setPlan}
                />
                {openModal && <SuccessModel setOpenModal={setOpenModal} />}
                {<CallBackButton from="landing" />}
                <Hero setIsOpen={setIsOpen} isOpen={isOpen} />
                <Slides />
                <Advantages />
                <Examples />
                <Pricing setPlan={setPlan} isOpen={isOpen} setIsOpen={setIsOpen} />
            </Box>
        </>
    );
};

export default HomePage;
