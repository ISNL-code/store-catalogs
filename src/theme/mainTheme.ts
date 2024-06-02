import { createTheme } from '@mui/material';
import { indigo, grey, lightGreen, red, green, yellow } from '@mui/material/colors';

const mainTheme = createTheme({
    palette: {
        primary: {
            main: indigo[500],
            light: indigo[50],
            dark: indigo[800],
        },
        success: {
            main: lightGreen[800],
            light: green[100],
            dark: green[800],
        },
        secondary: {
            main: grey[500],
            light: grey[100],
            dark: grey[800],
        },
        error: {
            main: red[400],
            light: red[100],
            dark: red[800],
        },
        info: {
            main: yellow[600],
            light: yellow[100],
            dark: yellow[900],
        },
    },

    typography: {
        button: {
            fontSize: '14px',
            lineHeight: 1.1,
            fontWeight: 600,
            textTransform: 'capitalize',
        },

        h1: { fontSize: '72px', lineHeight: 1, fontWeight: 700, fontFamily: 'sans-serif' },
        h2: { fontSize: '24px', lineHeight: 1.1, fontWeight: 500, color: '#000', fontFamily: 'sans-serif' },
        h3: { fontSize: '18px', lineHeight: 1.1, fontWeight: 500, color: '#000', fontFamily: 'sans-serif' }, //
        h4: { fontSize: '16px', lineHeight: 1.1, fontWeight: 400, color: '#1D1D1D', fontFamily: 'sans-serif' }, //
        h5: { fontSize: '14px', lineHeight: 1.1, fontWeight: 600, color: '#161616', fontFamily: 'sans-serif' },
        h6: { fontSize: '14px', lineHeight: 1.1, fontWeight: 500, color: '#161616', fontFamily: 'sans-serif' },
        body1: { fontSize: '16px', lineHeight: 1.2, fontWeight: 500, color: '#1D1D1D', fontFamily: 'sans-serif' },
        body2: { fontSize: '12px', lineHeight: 1.2, fontWeight: 500, color: '#1D1D1D', fontFamily: 'sans-serif' },
        overline: { fontSize: '16px', lineHeight: 1.2, fontWeight: 600, fontFamily: 'sans-serif' },
        subtitle1: { fontSize: '9px', lineHeight: 1.1, fontWeight: 600, fontFamily: 'sans-serif' },
        subtitle2: {
            fontSize: '12.5px',
            lineHeight: 1.2,
            fontWeight: 600,
            color: 'rgba(0, 0, 0, 0.4)',
            fontFamily: 'sans-serif',
        },
        caption: { fontSize: '12px', lineHeight: 1, fontWeight: 500, color: '#161616', fontFamily: 'sans-serif' },
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
