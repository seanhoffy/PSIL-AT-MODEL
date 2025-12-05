import { ThemeProvider as MUIThemeProvider, CssBaseline } from '@mui/material';
import { appTheme } from '../../constants/theme';

const ThemeProvider = ({ children }) => {
    return (
        <MUIThemeProvider theme={appTheme}>
            <CssBaseline />
            {children}
        </MUIThemeProvider>
    );
};

export default ThemeProvider;

