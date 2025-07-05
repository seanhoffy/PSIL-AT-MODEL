import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import '../App.css';
import InputsForm from '../components/inputs_and_outputs';
import NavBar from '../components/NavBar';

const theme = createTheme({
    palette: {
        background: {
            default: '#023e74',
        },
        primary: {
            main: '#023e74',
        },
    },
});

const HomePage = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* This helps in applying consistent base styles */}
            <div className="App">
                <NavBar />
                <InputsForm />
            </div>
        </ThemeProvider>
    );
}

export default HomePage;