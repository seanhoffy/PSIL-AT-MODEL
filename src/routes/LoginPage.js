import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Box, Card, CardHeader, CardContent, TextField, Button, CardActions, Avatar, Grid } from "@mui/material";
import SimpleNavBar from '../components/SimpleNavBar';
import ThemeProvider from '../components/common/ThemeProvider';
import { COLORS } from '../constants/colors';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    const logInWithEmailAndPassword = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            alert("Invalid login");
        }
    };

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/home");
    }, [loading, user, navigate]);

    return (
        <ThemeProvider>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <SimpleNavBar />
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justify="center"
                    sx={{ flex: 1, pt: 12 }}
                >
                    <Card
                        raised={true}
                        sx={{ width: 324 }}
                    >
                        <Grid
                            container
                            direction="column"
                            alignItems="center"
                            justify="center"
                        >
                            <CardHeader
                                sx={{ mt: 3, marginBottom: -2 }}
                                avatar={
                                    <Avatar sx={{ mr: -1, bgcolor: COLORS.primary }}>
                                        <Box component="img"
                                            src="/cepLogo2.png"
                                            alt="CEP Logo"
                                            sx={{
                                                height: 60,
                                                width: 'auto',
                                                objectFit: 'contain',
                                            }}
                                        />
                                    </Avatar>
                                }
                                titleTypographyProps={{ fontWeight: 'bold', color: 'primary', fontSize: 25, variant: 'h4', fontFamily: 'monospace' }}
                                title="PATpath"
                                style={{ align: 'center' }}
                            />
                            <CardContent sx={{ mt: 2 }}>
                                <TextField
                                    sx={{ width: 260 }}
                                    onChange={(event) => setEmail(event.target.value)}
                                    label="Email"
                                    type={'text'}
                                    id="filled-basic"
                                /><br />
                                <TextField
                                    sx={{ mt: 1, width: 260 }}
                                    onChange={(event) => setPassword(event.target.value)}
                                    label="Password"
                                    type={'password'}
                                    id="filled-basic"
                                />
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    onClick={() => logInWithEmailAndPassword(email, password)}
                                >
                                    Login
                                </Button>
                                <Button
                                    sx={{ ml: 1 }}
                                    href="/register"
                                    variant="outlined"
                                >
                                    Create Account
                                </Button>
                            </CardActions>
                        </Grid>
                        <br />
                    </Card>
                </Grid>
            </Box>
        </ThemeProvider>
    );
}