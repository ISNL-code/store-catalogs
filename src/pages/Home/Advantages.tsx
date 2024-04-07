import { Box, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useDevice } from 'hooks/useDevice';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { StoresContextInterface } from 'types';
import { useOutletContext } from 'react-router-dom';

const Advantages = () => {
    const { string }: StoresContextInterface = useOutletContext();
    const { sm } = useDevice();

    const TOOLS = [
        {
            name: string?.owners,
            price: '',
            rules: [
                {
                    title: string?.owner_title_1,
                    description: string?.owner_description_1,
                },
                {
                    title: string?.owner_title_2,
                    description: string?.owner_description_2,
                },
                {
                    title: string?.owner_title_3,
                    description: string?.owner_description_3,
                },
                {
                    title: string?.owner_title_4,
                    description: string?.owner_description_4,
                },
                {
                    title: string?.owner_title_5,
                    description: string?.owner_description_5,
                },
            ],
        },
        {
            name: string?.customers,
            price: '',
            rules: [
                {
                    title: string?.customer_title_1,
                    description: string?.customer_description_1,
                },
                {
                    title: string?.customer_title_2,
                    description: string?.customer_description_2,
                },
                {
                    title: string?.customer_title_3,
                    description: string?.customer_description_3,
                },
                {
                    title: string?.customer_title_4,
                    description: string?.customer_description_4,
                },
                {
                    title: string?.customer_title_5,
                    description: string?.customer_description_5,
                },
            ],
        },
    ];

    return (
        <Grid xs={12} container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box
                px={2}
                sx={{
                    width: '100%',
                    maxWidth: 1600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Box p={1}>
                    <Typography sx={{ fontSize: 22, fontWeight: 500 }}>{string?.main_advantages}</Typography>
                </Box>
            </Box>

            <Grid
                xs={12}
                container
                pl={1}
                pb={2}
                sx={{
                    maxWidth: 1600,
                    display: 'flex',
                    flexWrap: 'nowrap',
                    overflowX: 'scroll',
                    '&::-webkit-scrollbar': {
                        display: sm ? '' : 'none',
                    },
                }}
            >
                {TOOLS.map(({ name, rules }, index) => (
                    <Box p={1}>
                        <Box
                            key={index}
                            sx={{
                                backgroundColor: 'white',
                                borderRadius: 4,
                                boxShadow: '0 0 2px 1px green',
                                overflow: 'hidden',
                                minWidth: 350,
                                height: '100%',
                            }}
                        >
                            <Box
                                px={2}
                                py={0.5}
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderBottom: '1px solid #00690053',
                                    background: `green`,
                                    opacity: 0.9,
                                }}
                            >
                                <Typography sx={{ width: '100%', color: '#fff', fontSize: 20, textAlign: 'center' }}>
                                    {name}
                                </Typography>
                            </Box>
                            <Box
                                p={1.5}
                                sx={{
                                    // minHeight: 325,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 0.5,
                                }}
                            >
                                {rules.map((el, idx) => (
                                    <Box key={idx}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                // alignItems: 'center',
                                                gap: 0.5,
                                                py: 1,
                                            }}
                                        >
                                            <ControlPointIcon sx={{ color: 'green' }} />

                                            <Typography sx={{ color: 'gray' }}>
                                                <b style={{ color: '#000' }}>{el?.title}: </b> {el?.description}
                                            </Typography>
                                        </Box>
                                        {rules?.length !== idx + 1 && <Divider />}
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Grid>
        </Grid>
    );
};

export default Advantages;
