import { createTheme } from '@mui/material';

const mainTheme = createTheme({
    customPalette: {},

    typography: {
        button: {
            fontSize: '14px',
            lineHeight: 1.1,
            fontWeight: 600,
            textTransform: 'capitalize',
        },

        h1: { fontSize: '72px', lineHeight: 1.1, fontWeight: 700, fontFamily: 'Roboto' },
        h2: { fontSize: '24px', lineHeight: 1.1, fontWeight: 500, color: '#000' },
        h3: { fontSize: '18px', lineHeight: 1.1, fontWeight: 500, color: '#000' }, //
        h4: { fontSize: '16px', lineHeight: 1.1, fontWeight: 400, color: '#1D1D1D' }, //
        h5: { fontSize: '14px', lineHeight: 1.1, fontWeight: 600, color: '#161616' },
        h6: { fontSize: '14px', lineHeight: 1.1, fontWeight: 500, color: '#161616' },
        body1: { fontSize: '16px', lineHeight: 1.2, fontWeight: 500, color: '#1D1D1D' },
        body2: { fontSize: '12px', lineHeight: 1.2, fontWeight: 500, color: '#1D1D1D' },
        overline: { fontSize: '16px', lineHeight: 1.2, fontWeight: 600 },
        subtitle1: { fontSize: '9px', lineHeight: 1.1, fontWeight: 600 },
        subtitle2: { fontSize: '12.5px', lineHeight: 1.2, fontWeight: 600, color: 'rgba(0, 0, 0, 0.4)' },
        caption: { fontSize: '12px', lineHeight: 1, fontWeight: 500, color: '#161616' },
    },
    components: {
        MuiLink: {},
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    marginBottom: -8,
                    marginLeft: 6,
                    marginTop: 1,
                    color: 'rgba(0, 0, 0, 0.4)',
                    fontSize: '11px',
                    fontWeight: 500,
                },
            },
        },
    },
});

export default mainTheme;
