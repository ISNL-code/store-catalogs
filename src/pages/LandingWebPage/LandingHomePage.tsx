import { Box } from '@mui/material';
import { useState } from 'react';
import CallBackButton from 'components/atoms/Buttons/CallBackButton';
import MessageButton from 'components/atoms/Buttons/MessageButton';

const LandingHomePage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openQuestionForm, setOpenQuestionForm] = useState(false);
    const [plan, setPlan] = useState({ plan: '', subject: '' });
    const [openSuccessModal, setOpenSuccessModal] = useState(false);

    return (
        <>
            <Box>
                {/* <Form
                    values={{ ...plan }}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    setOpenSuccessModal={setOpenSuccessModal}
                    setPlan={setPlan}
                /> */}
                {/* <QuestionForm
                    values={{ ...plan }}
                    isOpen={openQuestionForm}
                    setIsOpen={setOpenQuestionForm}
                    setOpenSuccessModal={setOpenSuccessModal}
                /> */}
                {/* {openSuccessModal && <SuccessModel setOpenModal={setOpenSuccessModal} />} */}
                {/* {<CallBackButton />} */}
                {<MessageButton action={() => setOpenQuestionForm(!openQuestionForm)} />}
                {/* <Hero
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                    setOpenQuestionForm={setOpenQuestionForm}
                    openQuestionForm={openQuestionForm}
                /> */}
                {/* <Slides /> */}
                {/* <Advantages /> */}
                {/* <Examples /> */}
                {/* <Pricing setPlan={setPlan} isOpen={isOpen} setIsOpen={setIsOpen} /> */}
            </Box>
        </>
    );
};

export default LandingHomePage;
