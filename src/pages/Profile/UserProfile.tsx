import { Box, Button, TextField, Typography } from '@mui/material';
import BackButton from 'components/atoms/Buttons/BackButton';
import InstrumentalSubHeader from 'components/organisms/InstrumentalSubHeader/InstrumentalSubHeader';
import { useOutletContext, useParams } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { useDevice } from 'hooks/useDevice';
import { CatalogContextInterface } from 'types';
import { useUserApi } from 'api/useUserApi';
import Loader from 'components/atoms/Loader/Loader';
import { useEffect, useState } from 'react';

const UserProfile = () => {
    const { sx } = useDevice();
    const { string, currentUserData, updateUserData, setCurrentUserData }: CatalogContextInterface = useOutletContext();
    const { storeCode, storeName } = useParams();
    const { mutateAsync: updateProfile, isLoading } = useUserApi().useCustomerProfileUpdate();
    const [firstName, setFirstName] = useState(currentUserData?.delivery?.firstName);
    const [lastName, setLastName] = useState(currentUserData?.delivery?.lastName);
    const [phone, setPhone] = useState(currentUserData?.delivery?.phone);
    const [city, setCity] = useState(currentUserData?.delivery?.city);
    const [address, setAddress] = useState(currentUserData?.delivery?.address);

    useEffect(() => {
        if (!currentUserData) return;
        setFirstName(currentUserData?.delivery?.firstName);
        setLastName(currentUserData?.delivery?.lastName);
        setPhone(currentUserData?.delivery?.phone);
        setCity(currentUserData?.delivery?.city);
        setAddress(currentUserData?.delivery?.address);
    }, [currentUserData]);

    return (
        <Box>
            {isLoading && <Loader />}
            <InstrumentalSubHeader
                StartSlot={() => <BackButton nav={`/catalog/${storeCode}/${storeName}`} action={() => {}} />}
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
                                    },
                                },
                            }).then(_ => updateUserData().then(res => setCurrentUserData(res?.data?.data)));
                        }}
                    >
                        {string?.update}
                    </Button>
                )}
            />
            <Grid xs={12} container>
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
                    <Grid xs={12}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={currentUserData?.billing?.company || ''}
                            onChange={e => {}}
                            size="small"
                            label={string?.company_name}
                            fullWidth
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
                </Grid>
            </Grid>
        </Box>
    );
};

export default UserProfile;
