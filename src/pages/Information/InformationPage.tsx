import React, { useEffect, useRef } from 'react';
import InstrumentalSubHeader from 'components/organisms/InstrumentalSubHeader/InstrumentalSubHeader';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Button, Typography } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { HomeContextInterface } from 'types/outlet_context_models';
import { useDevice } from 'hooks/useDevice';
import { Colors } from 'constants/colors';
import BackButton from 'components/atoms/Buttons/BackButton';
import { scrollPage } from 'utils/scrollPage';

const InformationPage = () => {
    const { sx } = useDevice();
    const { appXPadding, footerMenuHeight, string, headerHeight, instrumentalBarHeight }: HomeContextInterface =
        useOutletContext();
    const aboutStoreRef = useRef(null);
    const paymentsDeliveryRef = useRef(null);
    const returnExchangeRef = useRef(null);
    const privacyPolicyRef = useRef(null);

    useEffect(() => {
        scrollPage(0);
    }, []);

    const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
        if (ref.current) {
            scrollPage(ref.current.offsetTop - 120, 'smooth');
        }
    };

    const data = [
        { title: string?.info_title_1, text: string?.info_text_1, ref: aboutStoreRef },
        { title: string?.info_title_2, text: string?.info_text_2, ref: paymentsDeliveryRef },
        { title: string?.info_title_3, text: string?.info_text_3, ref: returnExchangeRef },
        { title: string?.info_title_4, text: string?.info_text_4, ref: privacyPolicyRef },
    ];

    return (
        <Box p={sx ? 2 : appXPadding} sx={{ pb: `${footerMenuHeight}px` }} pt={4}>
            <InstrumentalSubHeader opacity={1} StartSlot={() => <BackButton />} />
            <Grid
                xs={12}
                container
                sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}
            >
                <Grid
                    container
                    xs={12}
                    sx={{
                        overflowY: 'auto',
                        position: 'fixed',
                        top: `calc(${headerHeight + instrumentalBarHeight}px) `,
                    }}
                >
                    <Grid
                        sx={{
                            p: 1,
                            px: sx ? 1 : 4,
                            minWidth: 'fit-content',
                            display: 'flex',
                            gap: 1,
                            flexWrap: 'nowrap',
                            whiteSpace: 'nowrap',
                            width: '100vw',
                        }}
                    >
                        {[
                            { name: string?.about_store, id: aboutStoreRef },
                            { name: string?.payments_delivery, id: paymentsDeliveryRef },
                            { name: string?.return_exchange, id: returnExchangeRef },
                            { name: string?.privacy_policy, id: privacyPolicyRef },
                        ].map(({ name, id }) => (
                            <Grid>
                                <Button
                                    sx={{
                                        width: 'fit-content',
                                        px: 0.8,
                                        fontSize: 12,
                                        backgroundColor: Colors?.WHITE,
                                        '&:hover': { backgroundColor: Colors?.WHITE },
                                    }}
                                    variant="outlined"
                                    onClick={() => scrollToRef(id)}
                                >
                                    {name}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                {data?.map(({ title, text, ref }, idx) => (
                    <Grid key={idx} xs={12} container mb={3} ref={ref}>
                        <Grid xs={12} sx={{ background: '#ececec7c', py: 0.75, mb: 1, textAlign: 'center' }}>
                            <Typography variant="h2" sx={{ lineHeight: 1 }}>
                                {title}
                            </Typography>
                        </Grid>

                        <Typography
                            sx={{ color: '#313131' }}
                            dangerouslySetInnerHTML={{ __html: text?.replace(/\n/g, '<br />') }}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default InformationPage;
