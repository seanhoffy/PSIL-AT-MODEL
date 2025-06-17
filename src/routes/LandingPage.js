import {
    Button,
    Typography,
    Box,
    Grid,
    Paper,
    Dialog,
    DialogContent,
    DialogActions,
} from "@mui/material";
import {
    FilterAlt,
    Download,
    MenuBook,
    Calculate,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const LandingPage = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const [devNoticeOpen, setDevNoticeOpen] = useState(false);
    const [intendedPath, setIntendedPath] = useState('');

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/home");
    }, [loading, user, navigate]);

    const handleDevNotice = (path) => {
        setIntendedPath(path);
        setDevNoticeOpen(true);
    };

    const handleDevNoticeClose = () => {
        setDevNoticeOpen(false);
        if (intendedPath) {
            navigate(intendedPath);
        }
    };

    return (
        <Box sx={{ backgroundColor: "#FFFFFF", fontFamily: 'Inter, sans-serif' }}>
            {/* Hero Section */}
            <Box
                sx={{
                    background: "url(/heroim.png) center/cover no-repeat",
                    backgroundColor: "#FFFFFF",
                    color: "white",
                    textAlign: "left",
                    px: { xs: 3, md: 12 },
                    pt: 10,
                    pb: 4,
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Title and Button on top */}
                <Box sx={{ position: "absolute", top: 24, left: { xs: 24, md: 96 }, display: 'flex', justifyContent: 'space-between', width: 'calc(100% - 150px)', alignItems: 'center' }}>
                    <Typography variant="h5" fontWeight="bold" sx={{ color: "#FFFFFF" }}>
                        PATpath.org
                    </Typography>
                </Box>

                {/* CEP Logo and Text in bottom right */}
                <Box
                    sx={{
                        position: "absolute",
                        right: { xs: 16, md: 48 },
                        bottom: { xs: 16, md: 24 },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        zIndex: 2,
                        pointerEvents: "none",
                    }}
                >
                    <Box
                        component="img"
                        src="/cepLogo.png"
                        alt="CEP Logo"
                        sx={{
                            width: { xs: 120, md: 180 },
                            maxHeight: { xs: 120, md: 180 },
                            height: "auto",
                            opacity: 0.95,
                            mb: 1,
                        }}
                    />
                    <Box
                        sx={{
                            background: "transparent",
                            px: 2,
                            py: 1,
                            borderRadius: 1,
                            mt: 0,
                            textAlign: "center",
                        }}
                    >
                        <Typography
                            variant="caption"
                            sx={{
                                color: "#023e74",
                                fontWeight: 500,
                                lineHeight: 1.3,
                            }}
                        >
                            University of California, Berkeley.<br />
                            Collaborative for the Economics of Psychedelics.<br />
                            We crunch the numbers that brings psychedelics to life.
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ pt: 4 }}>
                    <Typography variant="h3" fontWeight="bold" gutterBottom>
                        Model the Demand for
                    </Typography>
                    <Typography variant="h3" fontWeight="bold" gutterBottom>
                        Psilocybin Treatment for Depression.
                    </Typography>
                    <Typography
                        variant="h6"
                        maxWidth="md"
                        sx={{ mt: 5, mb: 4, color: "#023e74" }}
                    >
                        Based on a peer-reviewed model by{' '}
                        <a
                            href="https://www.doi.org/10.61373/pp024r.0025"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#023e74", textDecoration: "underline", fontWeight: 600 }}
                        >
                            Rab et al, 2024
                        </a>
                        , the CEP psilocybin-assisted therapy (PSIL-AT) demand model
                        provides estimates of the potential demand for PSIL-AT. It identifies eligible
                        individuals among those with major depressive disorder (MDD) and treatment-
                        resistant depression (TRD). It applies validated inclusion and exclusion criteria
                        from peer-reviewed research to accurately project treatment needs.
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                        <Button variant="contained" onClick={() => handleDevNotice('/register')} sx={{ backgroundColor: "#023e74" }}>
                            Try the Model
                        </Button>
                        <Button variant="outlined" color="inherit" onClick={() => handleDevNotice('/login')}>
                            Login
                        </Button>
                    </Box>
                </Box>
            </Box>

            {/* Development Notice Dialog */}
            <Dialog
                open={devNoticeOpen}
                onClose={() => setDevNoticeOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogContent>
                    <Typography variant="h6" gutterBottom sx={{ color: "#023e74", fontWeight: "bold", textAlign: "center" }}>
                        Development Notice
                    </Typography>
                    <Typography sx={{ mb: 2, textAlign: "center" }}>
                        THIS WEB APP IS UNDER DEVELOPMENT AND NOT INTENDED FOR USE OUTSIDE OF TESTING FOR DEVELOPMENT PURPOSES.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
                    <Button 
                        variant="contained" 
                        onClick={handleDevNoticeClose}
                        sx={{ 
                            backgroundColor: "#023e74",
                            '&:hover': {
                                backgroundColor: "#034e91"
                            }
                        }}
                    >
                        I Understand
                    </Button>
                </DialogActions>
            </Dialog>

            {/* What Does Our Model Offer Section */}
            <Box sx={{ px: { xs: 3, md: 12 }, py: 8, pb: 15 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ 
                    textAlign: 'center',
                    mb: 4,
                    color: '#023e74'
                }}>
                    What Does The CEP Model Offer?
                </Typography>
                <Grid container spacing={3}>
                    {/* 1. Customizable Inputs */}
                    <Grid item xs={12} sm={6} md={6}>
                        <Paper elevation={3} sx={{ 
                            p: 3,
                            height: '100%',
                            backgroundColor: 'white',
                            borderRadius: 2,
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: 6
                            }
                        }}>
                            <FilterAlt color="primary" fontSize="large" />
                            <Typography variant="h6" fontWeight="bold" sx={{ color: '#023e74' }}>
                                Customizable Inputs
                            </Typography>
                            <Typography sx={{ color: '#023e74' }}>
                                Choose population data and inclusion and exclusion criteria.
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* 2. Real-time Calculations */}
                    <Grid item xs={12} sm={6} md={6}>
                        <Paper elevation={3} sx={{ 
                            p: 3,
                            height: '100%',
                            backgroundColor: 'white',
                            borderRadius: 2,
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: 6
                            }
                        }}>
                            <Calculate color="primary" fontSize="large" />
                            <Typography variant="h6" fontWeight="bold" sx={{ color: '#023e74' }}>
                                Real-time Calculations
                            </Typography>
                            <Typography sx={{ color: '#023e74' }}>
                                Instantly see how inclusion/exclusion criteria affect treatment demand for your population.
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* 3. Data Transparency */}
                    <Grid item xs={12} sm={6} md={6}>
                        <Paper elevation={3} sx={{ 
                            p: 3,
                            height: '100%',
                            backgroundColor: 'white',
                            borderRadius: 2,
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: 6
                            }
                        }}>
                            <MenuBook color="primary" fontSize="large" />
                            <Typography variant="h6" fontWeight="bold" sx={{ color: '#023e74' }}>
                                Data Transparency
                            </Typography>
                            <Typography sx={{ color: '#023e74' }}>
                                Use default data inputs based on peer-reviewed source and authoritative population estimates.
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* 4. PDF Report Generation */}
                    <Grid item xs={12} sm={6} md={6}>
                        <Paper elevation={3} sx={{ 
                            p: 3,
                            height: '100%',
                            backgroundColor: 'white',
                            borderRadius: 2,
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: 6
                            }
                        }}>
                            <Download color="primary" fontSize="large" />
                            <Typography variant="h6" fontWeight="bold" sx={{ color: '#023e74' }}>
                                PDF Report Generation
                            </Typography>
                            <Typography sx={{ color: '#023e74' }}>
                                Download publication-ready reports for whatever use-case you need.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>

            {/* Why Use Our Model Section */}
            <Box sx={{ 
                mb: 4,
                px: { xs: 3, md: 12 }, 
                py: 8, 
                backgroundColor: '#023e74'
            }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ 
                    color: 'white',
                    textAlign: 'center',
                    mb: 4
                }}>
                    Who Should Use The CEP Model?
                </Typography>
                
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{
                            pt: 4, pr: 4, pl: 4, pb: 1,
                            backgroundColor: 'white',
                            borderRadius: 2,
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: 6
                            }
                        }}>
                            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: '#023e74' }}>
                                Healthcare Payers
                            </Typography>
                            <Typography paragraph sx={{ fontSize: '1.1rem', color: '#023e74' }}>
                                • Project potential patient populations for coverage planning.
                            </Typography>
                            <Typography sx={{ fontSize: '1.1rem', color: '#023e74' }}>
                                • Estimate regional treatment demand for resource allocation.
                            </Typography>
                            <Box sx={{ height: 93 }} />
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ 
                            pt: 4, pr: 4, pl: 4, pb: 4, 
                            backgroundColor: 'white',
                            borderRadius: 2,
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: 6
                            }
                        }}>
                            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: '#023e74' }}>
                                Policymakers & Healthcare Systems
                            </Typography>
                            <Typography paragraph sx={{ fontSize: '1.1rem', color: '#023e74' }}>
                                • Assess potential needs for psilocybin-assisted therapy for depression.
                            </Typography>
                            <Typography paragraph sx={{ fontSize: '1.1rem', color: '#023e74' }}>
                                • Plan resource allocation using region-specific insights.
                            </Typography>
                            <Typography sx={{ fontSize: '1.1rem', color: '#023e74' }}>
                                • Make data-driven treatment implementation decisions.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                <Box
                    sx={{
                        mt: 6,
                        p: 4,
                        backgroundColor: 'white',
                        borderRadius: 2,
                        color: '#023e74',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2
                    }}
                >
                    <Typography variant="h5" gutterBottom>
                        Make evidence-based projections of the potential demand for
                        psilocybin assisted therapy.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                    <Button
                        variant="contained"
                        onClick={() => handleDevNotice('/register')}
                        sx={{
                            backgroundColor: 'white',
                            color: '#023e74',
                            px: 4,
                            py: 1.5,
                            fontWeight: 600,
                            fontSize: '1.1rem',
                            borderRadius: 2,
                            boxShadow: 3,
                            border: '2px solid #023e74',
                            '&:hover': {
                                backgroundColor: '#f0f4fa',
                                color: '#023e74',
                                boxShadow: 6,
                                border: '2px solid #023e74'
                            }
                        }}
                    >
                        Try the Model
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default LandingPage;
