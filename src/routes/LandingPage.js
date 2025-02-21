import { AppBar, Toolbar, Button, Typography, Container, Box, Grid } from "@mui/material";
import { Info, LockOpen } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const LandingPage = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/home");
    }, [loading, user, navigate]);

    return (
        <>
            {/* Header */}
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        PSIL-AT Demand Model
                    </Typography>
                    <Button color="inherit" href="/login">Login</Button>
                    <Button color="inherit" href="/register">Register</Button>
                </Toolbar>
            </AppBar>

            {/* Hero Section */}
            <Box
                sx={{
                    height: "100vh",
                    backgroundImage: "url(/heroimage.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    textAlign: "center",
                    gap: 1,
                }}
            >
                <Typography variant="h2" sx={{ backgroundColor: "rgba(0,0,0,0)", p: 2 }}>
                    Title Info
                </Typography>
                <Typography variant="h6" sx={{ backgroundColor: "rgba(0,0,0,0)", p: 1, mt: 2 }}>
                    Subtitle Here
                </Typography>
            </Box>

            {/* Information Section */}
            <Container sx={{ py: 5 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Info fontSize="large" color="primary" />
                        <Typography variant="h6">Feature 1</Typography>
                        <Typography variant="body1">Description of feature 1.</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <LockOpen fontSize="large" color="primary" />
                        <Typography variant="h6">Feature 2</Typography>
                        <Typography variant="body1">Description of feature 2.</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Info fontSize="large" color="primary" />
                        <Typography variant="h6">Feature 3</Typography>
                        <Typography variant="body1">Description of feature 3.</Typography>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default LandingPage;
