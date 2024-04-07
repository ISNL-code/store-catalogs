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
import QuestionForm from './QuestionForm';
import MessageButton from 'components/atoms/Buttons/MessageButton';

const HomePage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [plan, setPlan] = useState({ plan: '', subject: '' });
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [openQuestionForm, setOpenQuestionForm] = useState(false);

    return (
        <>
            <Box>
                <Form
                    values={{ ...plan }}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    setOpenSuccessModal={setOpenSuccessModal}
                    setPlan={setPlan}
                />
                <QuestionForm
                    values={{ ...plan }}
                    isOpen={openQuestionForm}
                    setIsOpen={setOpenQuestionForm}
                    setOpenSuccessModal={setOpenSuccessModal}
                />
                {openSuccessModal && <SuccessModel setOpenModal={setOpenSuccessModal} />}
                {<CallBackButton from="landing" />}
                {<MessageButton from="landing" action={() => setOpenQuestionForm(!openQuestionForm)} />}
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
