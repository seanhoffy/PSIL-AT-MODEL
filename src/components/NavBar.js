import { AppBar, Toolbar, Typography, Box, Button, ButtonBase } from '@mui/material';
import logo from '../logo.svg';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const handleLogout = async () => {
    try {
        await signOut(auth);
        alert("You have been logged out.");
    } catch (error) {
        console.error("Logout error:", error.message);
    }
};

const NavBar = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (!user) navigate("/");
    }, [user, loading, navigate]);

    return (
        <AppBar position="static" sx={{ height: '80px' }}>
            <Toolbar sx={{ height: '100%' }}>
                <ButtonBase onClick={() => navigate('/home')}>
                    <Box component="img"
                        src={logo}
                        alt="logo"
                        sx={{
                            height: 60,
                            width: 60,
                            marginRight: 2
                        }}
                    />
                </ButtonBase>
                <Typography variant="h5" component="div">
                    PSWEET
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                    <Button color="inherit" onClick={() => navigate("/researchpaper")}>
                        ABOUT
                    </Button>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;