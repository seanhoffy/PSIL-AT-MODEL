import { createTheme } from '@mui/material';
import { COLORS } from './colors';

export const appTheme = createTheme({
    palette: {
        background: {
            default: COLORS.primary,
        },
        primary: {
            main: COLORS.primary,
        },
    },
});

