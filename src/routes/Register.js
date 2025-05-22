import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore";
import { FormControl, MenuItem, InputLabel, Select, Box, Avatar, Button, Card, CardActions, CardContent, CardHeader, createTheme, Grid, TextField, ThemeProvider, CssBaseline } from "@mui/material";
import logo from '../logo.svg';
import SimpleNavBar from '../components/SimpleNavBar';

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

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user_type, setUserType] = useState("");
    const [employer, setEmployer] = useState("");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/home");
    }, [loading, user, navigate]);

    const registerWithEmailAndPassword = async (name, email, password) => {
        if (!name || !email || !password || !user_type || !employer) {
            alert("Please fill in all fields.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;

            await setDoc(doc(db, "users", user.uid), {
                name: name,
                user_type: user_type,
                model: [],
                employer: employer
            });

            console.log("User successfully registered:", user);
        } catch (error) {
            console.error("Error during registration:", error);

            // Display more specific error messages
            switch (error.code) {
                case "auth/email-already-in-use":
                    alert("This email is already in use. Please try logging in.");
                    break;
                case "auth/invalid-email":
                    alert("Invalid email format. Please enter a valid email.");
                    break;
                case "auth/weak-password":
                    alert("Weak password. Password must be at least 6 characters.");
                    break;
                case "auth/network-request-failed":
                    alert("Network error. Please check your internet connection.");
                    break;
                default:
                    alert("Registration failed: " + error.message);
            }
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <SimpleNavBar />
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justify="center"
                    sx={{ flex: 1, pt: 4 }}
                >
                    <Card raised={true} sx={{ width: 324 }}>
                        <Grid
                            container
                            direction="column"
                            alignItems="center"
                            justify="center"
                        >
                            <CardHeader
                                sx={{ mt: 3, marginBottom: -2 }}
                                avatar={
                                    <Avatar sx={{ mr: -1, bgcolor: '#282c34' }}>
                                        <Box component="img"
                                            src={logo}
                                            alt="logo"
                                            sx={{
                                                height: 60,
                                                width: 60,
                                            }}
                                        />
                                    </Avatar>
                                }
                                titleTypographyProps={{ fontWeight: 'bold', color: 'primary', fontSize: 25, variant: 'h4', fontFamily: 'monospace' }}
                                title="PATpath"
                                style={{ align: 'center' }}
                            />
                        </Grid>
                        <CardContent sx={{ mt: 2, mx: 2 }}>
                            <TextField fullWidth
                                sx={{ mb: 1 }}
                                onChange={(event) => setName(event.target.value)}
                                label="Full Name"
                                value={name}
                                type={'text'}
                                id="filled-basic"
                            />
                            <TextField fullWidth
                                onChange={(event) => setEmail(event.target.value)}
                                label="Email"
                                value={email}
                                type={'text'}
                                id="filled-basic"
                            /><br />
                            <TextField fullWidth
                                sx={{ mt: 1, mb: 1 }}
                                onChange={(event) => setPassword(event.target.value)}
                                label="Password"
                                type={'password'}
                                id="filled-basic"
                            />
                            <FormControl fullWidth>
                                <InputLabel id="dropdown-label">User Type</InputLabel>
                                <Select
                                    labelId="dropdown-label"
                                    value={user_type}
                                    onChange={(event) => setUserType(event.target.value)}
                                    label="User Type"
                                >
                                    <MenuItem value="Researcher">Researcher</MenuItem>
                                    <MenuItem value="Payer">Payer</MenuItem>
                                    <MenuItem value="Student">Student</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField fullWidth
                                sx={{ mt: 1 }}
                                onChange={(event) => setEmployer(event.target.value)}
                                label="Employer"
                                value={employer}
                                type={'text'}
                                id="filled-basic"
                            />
                        </CardContent>
                        <CardActions sx={{ ml: 3.5 }}>
                            <Button
                                variant="contained"
                                onClick={() => registerWithEmailAndPassword(name, email, password)}
                            >
                                Create Account
                            </Button>
                            <Button
                                sx={{ ml: 1 }}
                                href="/login"
                                variant="outlined"
                            >
                                Login
                            </Button>
                        </CardActions>
                        <br />
                    </Card>
                </Grid>
            </Box>
        </ThemeProvider>
    );
}

export default Register;