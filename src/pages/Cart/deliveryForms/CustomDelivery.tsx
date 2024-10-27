import Grid from '@mui/material/Unstable_Grid2';
import { TextField, Checkbox, FormControlLabel } from '@mui/material';

interface Data {
    firstName?: string;
    lastName?: string;
    address?: string | null;
    city?: string | null;
    phone?: string | null;
    company?: string | null;
}

interface DataSet {
    setFirstName: (value: string) => void;
    setLastName: (value: string) => void;
    setAddress: (value: string) => void;
    setCity: (value: string) => void;
    setPhone: (value: string) => void;
    setCompany?: (value: string) => void;
}

interface Props {
    data: Data;
    dataSet: DataSet;
    string;
    saveDetails: boolean;
    setSaveDetails: (checked: boolean) => void;
}

const CustomDelivery = ({ data, dataSet, string, saveDetails, setSaveDetails }: Props) => {
    return (
        <>
            <Grid xs={12}>
                <TextField
                    value={data?.firstName || ''}
                    onChange={e => {
                        dataSet?.setFirstName(e?.target?.value);
                    }}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    size="small"
                    label={string?.first_name + '*'}
                    sx={{
                        '& label': {
                            color: '#898B9B',
                        },
                    }}
                />
            </Grid>
            <Grid xs={12}>
                <TextField
                    value={data?.lastName || ''}
                    onChange={e => {
                        dataSet?.setLastName(e?.target?.value);
                    }}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    size="small"
                    label={string?.last_name + '*'}
                    sx={{
                        '& label': {
                            color: '#898B9B',
                        },
                    }}
                />
            </Grid>
            <Grid xs={12}>
                <TextField
                    value={data?.phone || ''}
                    onChange={e => {
                        dataSet?.setPhone(e?.target?.value);
                    }}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    size="small"
                    label={string?.phone_number + '*'}
                    sx={{
                        '& label': {
                            color: '#898B9B',
                        },
                    }}
                />
            </Grid>
            <Grid xs={12}>
                <TextField
                    value={data?.city || ''}
                    onChange={e => {
                        dataSet?.setCity(e?.target?.value);
                    }}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    size="small"
                    label={string?.city + '*'}
                    sx={{
                        '& label': {
                            color: '#898B9B',
                        },
                    }}
                />
            </Grid>
            <Grid xs={12}>
                <TextField
                    value={data?.address || ''}
                    onChange={e => {
                        dataSet?.setAddress(e?.target?.value);
                    }}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    size="small"
                    label={string?.delivery_address + '*'}
                    sx={{
                        '& label': {
                            color: '#898B9B',
                        },
                    }}
                />
            </Grid>
            <Grid xs={12}>
                <TextField
                    value={data?.company || ''}
                    onChange={e => {
                        dataSet?.setCompany?.(e?.target?.value);
                    }}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    size="small"
                    label={string?.company_name}
                    sx={{
                        '& label': {
                            color: '#898B9B',
                        },
                    }}
                />
            </Grid>
            <Grid xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={saveDetails}
                            onChange={event => setSaveDetails(event.target.checked)}
                            name="saveDetails"
                            color="primary"
                        />
                    }
                    label={string?.save_delivery_info}
                />
            </Grid>
        </>
    );
};

export default CustomDelivery;
