import { AppBar, Toolbar, Typography, Box, Button, ButtonBase } from '@mui/material';
// import logo from '../logo.svg'; // Remove this line
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
        <AppBar position="static" sx={{ height: '80px', backgroundColor: '#FFFFFF', color: '#000000' }}>
            <Toolbar sx={{ height: '100%' }}>
                <ButtonBase onClick={() => navigate('/home')} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box component="img"
                        src={process.env.PUBLIC_URL + '/cepLogo2.png'}
                        alt="CEP Logo"
                        sx={{
                            height: 48,
                            width: 'auto',
                            objectFit: 'contain',
                            marginRight: 1
                        }}
                    />
                </ButtonBase>
                <ButtonBase onClick={() => navigate('/home')} sx={{ textTransform: 'none' }}>
                    <Typography variant="h5" component="div" sx={{ color: '#000000', ml: 0.5 }}>
                        PATpath.org
                    </Typography>
                </ButtonBase>
                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                    <Button color="inherit" onClick={() => navigate("/researchpaper")} sx={{ color: '#000000' }}>ABOUT</Button>
                    <Button color="inherit" onClick={() => navigate("/history")} sx={{ color: '#000000' }}>HISTORY</Button>
                    <Button color="inherit" onClick={handleLogout} sx={{ color: '#000000' }}>Logout</Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;