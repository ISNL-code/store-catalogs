import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useDevice } from 'hooks/useDevice';
import CheckIcon from '@mui/icons-material/Check';
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
                <Box px={2} py={0.5} sx={{ width: 'fit-content', border: '1px dashed #ccc', borderTop: 'none' }}>
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
                                    <Box
                                        key={idx}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            gap: 0.5,
                                            // mb: 0.75,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 20,
                                                height: 20,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: '1px solid #ccc',
                                                backgroundColor: 'green',
                                                borderRadius: '50%',
                                                opacity: 0.8,
                                            }}
                                        >
                                            <CheckIcon
                                                sx={{
                                                    p: 0.25,
                                                    color: '#fff',
                                                    fontSize: 10,
                                                    fontWeight: 700,
                                                    width: 18,
                                                    height: 18,
                                                }}
                                            />
                                        </Box>

                                        <Typography sx={{ color: 'gray' }}>
                                            <b style={{ color: '#000' }}>{el?.title}: </b> {el?.description}
                                        </Typography>
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
