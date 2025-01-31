import { AppBar, Toolbar, Typography, Box, ThemeProvider, createTheme, CssBaseline, Button } from '@mui/material';
import logo from './logo.svg';
import './App.css';
import InputsForm from './inputs_and_outputs';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

// Create a custom theme
const theme = createTheme({
    palette: {
        background: {
            default: '#328fa8',
        },
        primary: {
            main: '#282c34',
        },
    },
});

const handleLogout = async () => {
    try {
        await signOut(auth);
        alert("You have been logged out.");
    } catch (error) {
        console.error("Logout error:", error.message);
    }
};

const HomePage = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (!user) navigate("/");
    }, [user, loading, navigate]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* This helps in applying consistent base styles */}
            <div className="App">
                <AppBar position="static" sx={{ height: '80px' }}>
                    <Toolbar sx={{ height: '100%' }}>
                        <Box component="img"
                            src={logo}
                            alt="logo"
                            sx={{
                                height: 60,
                                width: 60,
                                marginRight: 2
                            }}
                        />
                        <Typography variant="h6" component="div">
                            PSIL-AT Demand Model
                        </Typography>
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
                <InputsForm />
            </div>
        </ThemeProvider>
    );
}

export default HomePage;