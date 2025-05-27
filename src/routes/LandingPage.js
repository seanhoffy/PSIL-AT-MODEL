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
                    py: 10,
                    position: "relative",
                }}
            >
                {/* Title and Button on top */}
                <Box sx={{ position: "absolute", top: 24, left: { xs: 24, md: 96 }, display: 'flex', justifyContent: 'space-between', width: 'calc(100% - 150px)', alignItems: 'center' }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ color: "#FFFFFF" }}>
                        PATpath.org
                    </Typography>
                    <Button variant="contained" onClick={() => handleDevNotice('/register')} sx={{ backgroundColor: "#023e74" }}>
                        Try the Model
                    </Button>
                </Box>

                <Box sx={{ pt: 4 }}>
                    <Typography variant="h3" fontWeight="bold" gutterBottom>
                        Model the Demand for Psilocybin
                    </Typography>
                    <Typography variant="h3" fontWeight="bold" gutterBottom>
                        Treatment for Depression in Your Region
                    </Typography>
                    <Typography variant="h6" maxWidth={"md"} sx={{ mt: 5, mb: 4, color: "#023e74" }}>
                        An interactive economic tool to estimate the local and national need
                        for psilocybin-assisted therapy for depression, based on your region's real-world data and our peer-reviewed research.
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
            <Box sx={{ px: { xs: 3, md: 12 }, py: 8 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ 
                    textAlign: 'center',
                    mb: 4,
                    color: '#023e74'
                }}>
                    What Does The Model Offer?
                </Typography>
                <Grid container spacing={3}>
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
                                Customizable Input Criteria
                            </Typography>
                            <Typography sx={{ color: '#023e74' }}>
                                Choose population data and exclusion criteria for your specific region.
                            </Typography>
                        </Paper>
                    </Grid>

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
                                Instantly see how different factors affect treatment demand in your region.
                            </Typography>
                        </Paper>
                    </Grid>

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
                                Use our default inputs based on peer-reviewed sources and national datasets.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>

            {/* Why Use Our Model Section */}
            <Box sx={{ 
                px: { xs: 3, md: 12 }, 
                py: 8, 
                backgroundColor: '#023e74'
            }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ 
                    color: 'white',
                    textAlign: 'center',
                    mb: 4
                }}>
                    Why Should You Use Our Model?
                </Typography>
                
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ 
                            p: 4, 
                            height: '100%',
                            backgroundColor: 'white',
                            borderRadius: 2,
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: 6
                            }
                        }}>
                            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: '#023e74' }}>
                                For Insurance Companies
                            </Typography>
                            <Typography paragraph sx={{ fontSize: '1.1rem', color: '#023e74' }}>
                                • Project potential patient populations for coverage planning
                            </Typography>
                            <Typography paragraph sx={{ fontSize: '1.1rem', color: '#023e74' }}>
                                • Estimate regional treatment demand for resource allocation
                            </Typography>
                            <Typography paragraph sx={{ fontSize: '1.1rem', color: '#023e74' }}>
                                • Support evidence-based coverage decisions with real-world data
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ 
                            p: 4, 
                            height: '100%',
                            backgroundColor: 'white',
                            borderRadius: 2,
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: 6
                            }
                        }}>
                            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: '#023e74' }}>
                                For Policymakers & Healthcare Systems
                            </Typography>
                            <Typography paragraph sx={{ fontSize: '1.1rem', color: '#023e74' }}>
                                • Assess local treatment needs based on population demographics
                            </Typography>
                            <Typography paragraph sx={{ fontSize: '1.1rem', color: '#023e74' }}>
                                • Plan resource allocation with region-specific insights
                            </Typography>
                            <Typography paragraph sx={{ fontSize: '1.1rem', color: '#023e74' }}>
                                • Make data-driven decisions about treatment implementation
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                <Box sx={{ 
                    mt: 6, 
                    p: 4, 
                    backgroundColor: 'white',
                    borderRadius: 2,
                    color: '#023e74',
                    textAlign: 'center'
                }}>
                    <Typography variant="h6" gutterBottom>
                        Make Informed Decisions with Real Data
                    </Typography>
                    <Typography sx={{ fontSize: '1.1rem' }}>
                        Our model combines regional population data, exclusion criteria, and peer-reviewed research
                        to provide actionable insights for your specific needs.
                    </Typography>
                </Box>
            </Box>

            {/* Footer */}
            <Box 
                component="footer" 
                sx={{ 
                    py: 4,
                    px: { xs: 3, md: 12 },
                    mt: 4,
                    borderTop: '1px solid #e0e0e0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2
                }}
            >
                <Box 
                    component="img"
                    src="/cepLogo.png"
                    alt="CEP Logo"
                    sx={{
                        width: '120px',
                        height: '120px',
                        objectFit: 'contain'
                    }}
                />
                <Typography 
                    variant="subtitle1" 
                    sx={{ 
                        color: '#023e74',
                        textAlign: 'center',
                        fontWeight: 500
                    }}
                >
                    The Collaborative for the Economics of Psychedelics
                </Typography>
            </Box>
        </Box>
    );
};

export default LandingPage;
