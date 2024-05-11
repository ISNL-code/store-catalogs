import { Box, Typography } from '@mui/material';
import { useDevice } from 'hooks/useDevice';
import Grid from '@mui/material/Unstable_Grid2';
import { useOutletContext } from 'react-router-dom';
import MessageButton from 'components/atoms/Buttons/MessageButton';
import { motion } from 'framer-motion';
import QuestionForm from './QuestionForm';
import { useState } from 'react';
import SuccessModel from './SuccessModel';
import { HomeContextInterface } from 'types';
import HomeImages from './HomeImages';
import CallBackButton from 'components/atoms/Buttons/CallBackButton';

const HomePage = () => {
    const { appXPadding, footerMenuHeight }: HomeContextInterface = useOutletContext();
    const [openQuestionForm, setOpenQuestionForm] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const { string }: any = useOutletContext();
    const { sx } = useDevice();
    const variants = num => {
        return { hidden: { opacity: sx ? 0 : 1, y: sx ? 100 * num : 0 }, visible: { opacity: 1, y: 0 } };
    };

    return (
        <Box p={sx ? 2 : appXPadding} pb={footerMenuHeight}>
            <QuestionForm
                isOpen={openQuestionForm}
                setIsOpen={setOpenQuestionForm}
                setOpenSuccessModal={setOpenSuccessModal}
            />
            <MessageButton
                action={() => {
                    setOpenQuestionForm(true);
                }}
            />
            {openSuccessModal && <SuccessModel setOpenModal={setOpenSuccessModal} />}
            <CallBackButton path="/" />
            <HomeImages />
            <Grid container xs={12}>
                <Typography
                    variant="h1"
                    sx={{
                        color: '#fff',
                        zIndex: 1,
                        textShadow: '#000000 0 0 5px',
                        fontSize: sx ? 48 : 96,
                    }}
                >
                    Elegance in Outerwear
                </Typography>
            </Grid>
            <Box sx={{ height: sx ? '90vh' : 5 }}></Box>
            <Grid
                mb={sx ? '100vh' : 0}
                xs={12}
                container
                sx={{
                    flexWrap: 'wrap',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: '900px',
                }}
            >
                {[1, 2, 2, 2].map((el, idx) => (
                    <motion.div
                        key={idx}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        variants={variants(el)}
                        style={{ width: '100%', zIndex: 2 }}
                    >
                        <Grid
                            p={sx ? 1 : 4}
                            py={sx ? 1 : 1.75}
                            container
                            xs={12}
                            mt={1.2}
                            sx={{ backgroundColor: '#ffffff78', zIndex: 2, borderRadius: 1, position: 'relative' }}
                        >
                            <Typography sx={{ color: '#000', zIndex: 1, fontSize: sx ? 23 : 36 }}>
                                {string?.[`customer_title_${idx + 1}`]}
                            </Typography>
                            <Typography sx={{ color: '#2c2c2c', zIndex: 1, fontWeight: 500, fontSize: sx ? 15 : 24 }}>
                                {string?.[`customer_description_${idx + 1}`]}
                            </Typography>
                        </Grid>
                    </motion.div>
                ))}
            </Grid>
        </Box>
    );
};
export default HomePage;
