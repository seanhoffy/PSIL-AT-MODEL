import React, { useState, useEffect, } from 'react';
import { NumericFormat } from 'react-number-format';
import {
    Container,
    Paper,
    Typography,
    Grid,
    TextField,
    Button,
    Box,
    Card,
    CardContent,
    InputAdornment
} from '@mui/material';
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';

const InputsForm = () => {
    const [model, setModel] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        if (user?.uid) {
            const getModel = async () => {
                try {
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setModel(docSnap.data().model || []);
                    }
                } catch (error) {
                    console.error("Error fetching model:", error);
                }
            };
            getModel();
        }
    }, [user]);

    useEffect(() => {
        if (model.length > 0) {
            updateModel();
        }
    }, [model]);

    const updateModel = async () => {
        if (!user?.uid) return;
        try {
            const docRef = doc(db, "users", user.uid);
            await updateDoc(docRef, { model: model });
            console.log("Model updated in Firestore:", model);
        } catch (error) {
            console.error("Error updating model:", error);
        }
    };

    const [formData, setFormData] = useState({
        MDD: 9028000,
        TRD_P: 30,
        TRD: 2708400, // Calculated as 30% of MDD
        manic_P: 19,
        suicide_P: 8,
        diabetes_P: 2.9,
        stroke_P: 1.9,
        heart_attack_P: 2.7,
        blood_pressure_P: 2,
        epilepsy_P: 3.7,
        personality_P: 2.2,
        hepatic_P: 1.8,
        psycological_P: 23.2,
        health_P: 8,
        comorbid_hepatic_P: 1
    });

    const [results, setResults] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const numericValue = value === '' ? 0 : parseFloat(value);
            const newData = { ...prev, [name]: numericValue };
            // Auto-calculate TRD when MDD changes
            if (name === 'MDD' || name === 'TRD_P') {
                newData.TRD = newData.MDD * (newData.TRD_P / 100);
            }
            return newData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Recreating your Python calculations in JavaScript
        const trial_MDD = formData.MDD * 0.24;
        const trial_TRD = formData.TRD * 0.24;

        const real_P = Math.round(formData.manic_P + formData.suicide_P + formData.diabetes_P +
            formData.stroke_P + formData.heart_attack_P + formData.blood_pressure_P +
            formData.epilepsy_P + formData.personality_P + formData.hepatic_P);

        const comorbid_p = Math.round(formData.psycological_P + formData.health_P + formData.epilepsy_P +
            formData.personality_P + formData.comorbid_hepatic_P);

        const real_MDD = formData.MDD * (1 - (real_P / 100));
        const real_TRD = formData.TRD * (1 - (real_P / 100));
        const comorbid_MDD = formData.MDD * (1 - (comorbid_p / 100));
        const comorbid_TRD = formData.TRD * (1 - (comorbid_p / 100));

        setResults({
            trial: {
                MDD: trial_MDD.toFixed(0),
                TRD: trial_TRD.toFixed(0)
            },
            real: {
                MDD: real_MDD.toFixed(0),
                TRD: real_TRD.toFixed(0)
            },
            comorbid: {
                MDD: comorbid_MDD.toFixed(0),
                TRD: comorbid_TRD.toFixed(0)
            }
        });

        setModel([trial_MDD.toFixed(0), trial_TRD.toFixed(0), real_MDD.toFixed(0), real_TRD.toFixed(0), comorbid_MDD.toFixed(0), comorbid_TRD.toFixed(0)]);
    };

    // const textFieldStyle = {
    //     '& .MuiOutlinedInput-root': {
    //         // backgroundColor: '#61bbd4',
    //         borderRadius: '4px', // Match Material UI's default border radius
    //         '& fieldset': {
    //             borderColor: '#e0e0e0',
    //         },
    //         '&:hover fieldset': {
    //             borderColor: '#bdbdbd',
    //         },
    //         '&.Mui-focused fieldset': {
    //             borderColor: '#1976d2',
    //         },
    //         '& input': {
    //             borderRadius: '4px', // Match the outer border radius
    //             backgroundColor: "#61bbd4"
    //         }
    //     }
    // };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* Prevalence Section */}
                    <Paper elevation={2} sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom>Prevalence</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Enter the number of people with MDD in your location and the % with TRD
                        </Typography>
                        <Grid container spacing={3} alignItems="center">
                            <Grid item>
                                <NumericFormat
                                    customInput={TextField}
                                    sx={{ width: "425px" }}
                                    label="Patients with MDD"
                                    name="MDD"
                                    thousandSeparator=","
                                    value={formData.MDD}
                                    onValueChange={(values) => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            MDD: values.value, // Store raw number
                                        }));
                                    }}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    sx={{ width: "206px" }}  // Smaller width for percentage field
                                    label="Percentage With TRD"
                                    name="TRD_P"
                                    type="number"
                                    value={formData.TRD_P}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <NumericFormat
                                    customInput={TextField}
                                    sx={{ width: "425px" }}
                                    label="Patients with TRD: 2+ Treatment Failures (Calculated with %)"
                                    name="TRD"
                                    thousandSeparator=","
                                    value={formData.TRD}
                                    disabled
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* Real World Exculsion Criteria */}
                    <Paper elevation={2} sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom>Real World Exculsion Criteria</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Enter percentages of MDD patients that have listed conditions
                        </Typography>
                        <Grid container spacing={3}>
                            {[
                                ['manic_P', 'Psychotic or Manic Disorder'],
                                ['suicide_P', 'Suicide Attempt in the Past Year'],
                                ['diabetes_P', 'Diabetes (uncontrolled)'],
                                ['stroke_P', 'Stroke'],
                                ['heart_attack_P', 'Heart Attack in the last Year'],
                                ['blood_pressure_P', 'Treatement-Resistant Blood Pressure 140+/90+'],
                                ['epilepsy_P', 'Epilepsy'],
                                ['personality_P', 'Personality Disorder'],
                                ['hepatic_P', 'Hepatic Impairment'],
                            ].map(([key, label]) => (
                                <Grid item xs={12} sm={6} md={4} key={key}>
                                    <TextField
                                        fullWidth
                                        label={`${label}`}
                                        name={key}
                                        type="number"
                                        InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                                        value={formData[key]}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>

                    {/* Double Counting Section */}
                    <Paper elevation={2} sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom>Double Counting</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Enter new percentages to adjust for double counting
                        </Typography>
                        <Grid container spacing={3}>
                            {[
                                ['psycological_P', 'Psychological Problems (Manic, Suicide)'],
                                ['health_P', 'Health Conditions (Diabetes, Stroke, Heart Attack, BP+)'],
                                ['comorbid_hepatic_P', 'Lower Hepatic Impairment'],
                            ].map(([key, label]) => (
                                <Grid item xs={12} sm={6} md={4} key={key}>
                                    <TextField
                                        fullWidth
                                        label={`${label}`}
                                        name={key}
                                        type="number"
                                        InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                                        value={formData[key]}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{ mt: 2 }}
                    >
                        Calculate Results
                    </Button>
                </Box>
            </form>

            {results && (
                <Paper elevation={2} sx={{ mt: 4, p: 3 }}>
                    <Typography variant="h5" gutterBottom>Psilocybin Demand</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Based on your input values
                    </Typography>

                    {/* Trial Results */}
                    <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Trial Exculsion Results</Typography>
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid item xs={12} sm={6}>
                            <Card>
                                <CardContent>
                                    <Typography color="text.secondary" gutterBottom>
                                        Lower Bound MDD
                                    </Typography>
                                    <Typography variant="h6">
                                        {parseInt(results.trial.MDD).toLocaleString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Card>
                                <CardContent>
                                    <Typography color="text.secondary" gutterBottom>
                                        Lower Bound TRD
                                    </Typography>
                                    <Typography variant="h6">
                                        {parseInt(results.trial.TRD).toLocaleString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Real Results */}
                    <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Real World Results</Typography>
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid item xs={12} sm={6}>
                            <Card>
                                <CardContent>
                                    <Typography color="text.secondary" gutterBottom>
                                        Middle Bound MDD
                                    </Typography>
                                    <Typography variant="h6">
                                        {parseInt(results.real.MDD).toLocaleString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Card>
                                <CardContent>
                                    <Typography color="text.secondary" gutterBottom>
                                        Middle Bound TRD
                                    </Typography>
                                    <Typography variant="h6">
                                        {parseInt(results.real.TRD).toLocaleString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Comorbid Results */}
                    <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Double Counting Results</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Card>
                                <CardContent>
                                    <Typography color="text.secondary" gutterBottom>
                                        Upper Bound MDD
                                    </Typography>
                                    <Typography variant="h6">
                                        {parseInt(results.comorbid.MDD).toLocaleString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Card>
                                <CardContent>
                                    <Typography color="text.secondary" gutterBottom>
                                        Upper Bound TRD
                                    </Typography>
                                    <Typography variant="h6">
                                        {parseInt(results.comorbid.TRD).toLocaleString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Paper>
            )}
        </Container>
    );
};

export default InputsForm;