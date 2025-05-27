import {
    Button,
    Typography,
    Box,
    Grid,
    Paper,
} from "@mui/material";
import {
    Map,
    FilterAlt,
    Download,
    MenuBook,
} from "@mui/icons-material";
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
                        PATPath.org
                    </Typography>
                    <Button variant="contained" href="/register" sx={{ backgroundColor: "#023e74" }}>
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
                        THIS WEB APP IS UNDER DEVELOPMENT AND NOT INTENDED FOR USE OUTSIDE OF TESTING FOR DEVELOPMENT PURPOSES. An interactive economic tool to estimate the local and national need
                        for psilocybin-assisted therapy for depression, based on real-world data and peer-reviewed trials.
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                        <Button variant="contained" href="/register" sx={{ backgroundColor: "#023e74" }}>
                            Try the Model
                        </Button>
                        <Button variant="outlined" color="inherit" href="/login">
                            Login
                        </Button>
                    </Box>
                </Box>
            </Box>

            {/* Why This Model Matters */}
            <Box sx={{ px: { xs: 3, md: 12 }, py: 8 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Why This Model Matters
                </Typography>
                <Typography paragraph>
                    Depression, PTSD, and addiction are rising globally, and emerging research
                    shows psilocybin-assisted therapy may help. Yet, there's little clarity on
                    where and how it's needed.
                </Typography>
                <Typography paragraph>
                    Our tool estimates treatment demand using:
                </Typography>
                <ul>
                    <li>Population and health data</li>
                    <li>Regional customization</li>
                    <li>Diagnostic prevalence rates</li>
                </ul>
                <Typography paragraph>
                    💡 Use this model to support policy funding, and clinical planning.
                </Typography>

                <Grid container spacing={4} mt={4}>
                    <Grid item xs={12} sm={6} md={6}>
                        <Paper variant="outlined" sx={{ p: 3 }}>
                            <Map color="primary" fontSize="large" />
                            <Typography variant="h6" fontWeight="bold">
                                Interactive Maps and Charts
                            </Typography>
                            <Typography>
                                Visualize demand estimates across US cities, counties, or Zip codes.
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <Paper variant="outlined" sx={{ p: 3 }}>
                            <FilterAlt color="primary" fontSize="large" />
                            <Typography variant="h6" fontWeight="bold">
                                Customizable Input Criteria
                            </Typography>
                            <Typography>
                                Choose inclusion/exclusion filters like age, comorbidities, or prior treatment.
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <Paper variant="outlined" sx={{ p: 3 }}>
                            <Download color="primary" fontSize="large" />
                            <Typography variant="h6" fontWeight="bold">
                                PDF Report Generation
                            </Typography>
                            <Typography>
                                Download beautiful, publication-ready reports for stakeholders or publications.
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <Paper variant="outlined" sx={{ p: 3 }}>
                            <MenuBook color="primary" fontSize="large" />
                            <Typography variant="h6" fontWeight="bold">
                                Data Transparency
                            </Typography>
                            <Typography>
                                Peer-reviewed sources and national datasets (e.g. CDC, SAMHSA, Census)
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                <Box mt={6}>
                    <Typography
                        fontStyle="italic"
                        fontSize="1.1rem"
                        color="text.secondary"
                        gutterBottom
                    >
                        “Insert Quote.”
                    </Typography>
                    <Typography align="right" fontSize="0.9rem">
                        – Dr. Elliot Marseille, Health Economist, UC Berkeley
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default LandingPage;
