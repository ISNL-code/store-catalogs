import { Box, Button, TextField, Typography } from '@mui/material';
import BackButton from 'components/atoms/Buttons/BackButton';
import InstrumentalSubHeader from 'components/organisms/InstrumentalSubHeader/InstrumentalSubHeader';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { useDevice } from 'hooks/useDevice';
import { CatalogContextInterface } from 'types/outlet_context_models';
import { useUserApi } from 'api/useUserApi';
import Loader from 'components/atoms/Loader/Loader';
import { useEffect, useState } from 'react';
import useHandleError from 'hooks/useHandleError';
import { scrollPage } from 'utils/scrollPage';
import { ROUTES } from 'router/routes';
import { useIsMount } from 'hooks/useIsMount';

const UserProfile = () => {
    const mount = useIsMount();
    const { sx } = useDevice();
    const navigate = useNavigate();
    const {
        string,
        currentUserData,
        updateUserData,
        setCurrentUserData,
        appXPadding,
        footerMenuHeight,
        userDataError,
        auth,
    }: CatalogContextInterface = useOutletContext();
    const { storeCode } = useParams();
    const handleError = useHandleError();
    const { mutateAsync: updateProfile, isLoading } = useUserApi().useCustomerProfileUpdate({ storeCode });
    const [firstName, setFirstName] = useState(currentUserData?.delivery?.firstName);
    const [lastName, setLastName] = useState(currentUserData?.delivery?.lastName);
    const [phone, setPhone] = useState(currentUserData?.delivery?.phone);
    const [city, setCity] = useState(currentUserData?.delivery?.city);
    const [address, setAddress] = useState(currentUserData?.delivery?.address);
    const [company, setCompany] = useState(currentUserData?.delivery?.company);

    useEffect(() => {
        scrollPage(0);
    }, []);

    useEffect(() => {
        if (mount) return;
        if (!auth) navigate(ROUTES?.STORE);
    }, [auth]); // eslint-disable-line

    useEffect(() => {
        if (!currentUserData) {
            if (userDataError) {
                return handleError(userDataError);
            } else {
                console.log('user_profile');
                updateUserData();
            }
        }
        setFirstName(currentUserData?.delivery?.firstName);
        setLastName(currentUserData?.delivery?.lastName);
        setPhone(currentUserData?.delivery?.phone);
        setCity(currentUserData?.delivery?.city);
        setAddress(currentUserData?.delivery?.address);
        setCompany(currentUserData?.delivery?.company);
    }, [currentUserData, userDataError]); // eslint-disable-line

    return (
        <Box p={sx ? 2 : appXPadding} sx={{ pb: `${footerMenuHeight}px ` }}>
            {isLoading && <Loader />}
            <InstrumentalSubHeader
                StartSlot={() => <BackButton />}
                EndSlot={() => (
                    <Button
                        variant="outlined"
                        color="primary"
                        sx={{ backgroundColor: 'white' }}
                        onClick={() => {
                            updateProfile({
                                data: {
                                    delivery: {
                                        firstName,
                                        lastName,
                                        city,
                                        phone,
                                        address,
                                        company,
                                    },
                                },
                            }).then(_ => updateUserData().then(res => setCurrentUserData(res?.data?.data)));
                        }}
                    >
                        {string?.update}
                    </Button>
                )}
            />
            <Grid xs={12} container alignItems={'flex-start'}>
                <Grid p={1} xs={sx ? 12 : 6} container spacing={1.5}>
                    <Grid mb={2} xs={12}>
                        <Typography variant="h3">{string?.personal_data}</Typography>
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={currentUserData?.firstName || ''}
                            onChange={e => {}}
                            size="small"
                            label={string?.first_name}
                            fullWidth
                            disabled
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={currentUserData?.lastName || ''}
                            onChange={e => {}}
                            size="small"
                            label={string?.last_name}
                            fullWidth
                            disabled
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={currentUserData?.billing?.phone || ''}
                            onChange={e => {}}
                            size="small"
                            label={string?.phone_number}
                            fullWidth
                            disabled
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={currentUserData?.emailAddress || ''}
                            onChange={e => {}}
                            size="small"
                            label={string?.email}
                            fullWidth
                            disabled
                        />
                    </Grid>
                </Grid>
                <Grid p={1} xs={sx ? 12 : 6} container spacing={1.5}>
                    <Grid mb={2} xs={12}>
                        <Typography variant="h3">{string?.delivery_data}</Typography>
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={firstName || ''}
                            onChange={e => {
                                setFirstName(e?.target?.value);
                            }}
                            size="small"
                            label={string?.first_name}
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={lastName || ''}
                            onChange={e => {
                                setLastName(e?.target?.value);
                            }}
                            size="small"
                            label={string?.last_name}
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={phone || ''}
                            onChange={e => {
                                setPhone(e?.target?.value);
                            }}
                            size="small"
                            label={string?.phone_number}
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={city || ''}
                            onChange={e => {
                                setCity(e?.target?.value);
                            }}
                            size="small"
                            label={string?.city}
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={address || ''}
                            onChange={e => {
                                setAddress(e?.target?.value);
                            }}
                            size="small"
                            label={string?.delivery_address}
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={company || ''}
                            onChange={e => {
                                setCompany(e?.target?.value);
                            }}
                            size="small"
                            label={string?.company_name}
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default UserProfile;
