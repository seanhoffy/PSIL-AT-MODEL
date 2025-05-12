import React, { useState, useEffect, useCallback } from 'react';
import { NumericFormat } from 'react-number-format';
import {
    Dialog, DialogActions, DialogContent, DialogTitle,
    Container,
    Paper,
    Typography,
    Grid,
    TextField,
    Button,
    Box,
    Card,
    CardContent,
    InputAdornment,
} from '@mui/material';
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import SourceInputList from './sources';
import Spacer from './spacer'
import { IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import MyDocument from './pdf/pdf.js';
import { pdf } from '@react-pdf/renderer';

const InputsForm = () => {
    const [model, setModel] = useState([]);
    const [user] = useAuthState(auth);
    const [open, setOpen] = useState(false);
    const [info1Open, setInfo1Open] = useState(false); // Renamed state variables
    const [info2Open, setInfo2Open] = useState(false); // Renamed state variables
    const [info3Open, setInfo3Open] = useState(false); // Renamed state variables

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    const updateModel = useCallback(async () => {
        if (!user?.uid) return;
        try {
            const docRef = doc(db, "users", user.uid);
            await updateDoc(docRef, { model: model });
            console.log("Model updated in Firestore:", model);
        } catch (error) {
            console.error("Error updating model:", error);
        }
    }, [user, model]);

    useEffect(() => {
        if (model.length > 0) {
            updateModel();
        }
    }, [model, updateModel]);

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
        comorbid_hepatic_P: 1,
        modelTitle: "",
        geographicArea: "",
        motivation: "",
        additionalComments: "",
    });

    const [results, setResults] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            let newValue;

            // Check if the input is a number or string
            if (['modelTitle', 'geographicArea', 'motivation', 'additionalComments'].includes(name)) {
                // If it's a string, just set the value
                newValue = value;
            } else {
                // If it's a number, parse it (allowing empty strings to be set to 0)
                newValue = value === '' ? 0 : parseFloat(value);
            }

            const newData = { ...prev, [name]: newValue };

            // Auto-calculate TRD when MDD changes
            if (name === 'MDD' || name === 'TRD_P') {
                newData.TRD = newData.MDD * (newData.TRD_P / 100);
            }

            return newData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // If there's any error, don't submit the form
        if (formData.modelTitle === "" || formData.geographicArea === "") {
            alert("Please fill out all required fields.");
            return;
        }

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

    const handleDownload = async () => {
        const blob = await pdf(<MyDocument formData={formData} results={results} />).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
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
                    <Paper elevation={2} sx={{ p: 3 }}>
                        <Box display="flex" alignItems="center" justifyContent="center" gap={0}>
                            <Typography variant="h5">General Info</Typography>
                            <IconButton onClick={() => setInfo1Open(true)}>
                                <InfoIcon />
                            </IconButton>
                        </Box>
                        {/* Popup Dialog */}
                        <Dialog
                            open={info1Open}
                            onClose={() => setInfo1Open(false)}
                            maxWidth="md"
                            fullWidth
                        >
                            <DialogTitle>More Information</DialogTitle>
                            <DialogContent>
                                <p>Model Title: Give your model a name that is consistant with it's purpose.</p>
                                <p>Geographic Area: Tell us which geographic location this model usage applies to.</p>
                                <p>Motivation: Tell us why you are using our demand model.</p>
                                <p>Comments: Please feel free to leave any additional questions or concerns here.</p>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setInfo1Open(false)} variant="contained">
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Tell us the about yourself and your motivaiton behind using this model
                        </Typography>
                        <Grid container spacing={3} alignItems="center">
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    label="Model Title*"
                                    variant="outlined"
                                    name="modelTitle"
                                    value={formData.modelTitle}
                                    onChange={handleInputChange}></TextField>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    label="Geographic Area*"
                                    variant="outlined"
                                    name="geographicArea"
                                    value={formData.geographicArea}
                                    onChange={handleInputChange}></TextField>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    label="Motivation"
                                    variant="outlined"
                                    name="motivation"
                                    value={formData.motivation}
                                    onChange={handleInputChange}></TextField>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    label="Additional Comments"
                                    variant="outlined"
                                    name="additionalComments"
                                    value={formData.additionalComments}
                                    onChange={handleInputChange}></TextField>
                            </Grid>
                        </Grid>
                        <Spacer height={20} />
                        <SourceInputList />
                        <Typography variant='body2' sx={{ textAlign: 'left', mt: 1 }}>
                            *required
                        </Typography>
                    </Paper>

                    {/* Prevalence Section */}
                    <Paper elevation={2} sx={{ p: 3 }}>
                        <Box display="flex" alignItems="center" justifyContent="center" gap={0}>
                            <Typography variant="h5">Prevalence in Your Geographic Location</Typography>
                            <IconButton onClick={() => setInfo2Open(true)}>
                                <InfoIcon />
                            </IconButton>
                        </Box>
                        {/* Popup Dialog */}
                        <Dialog
                            open={info2Open}
                            onClose={() => setInfo2Open(false)}
                            maxWidth="md"
                            fullWidth
                        >
                            <DialogTitle>More Information</DialogTitle>
                            <DialogContent>
                                <p>The default values are based on estimates of the US population as a whole.</p>
                                <p>Patients with MDD: Input your estimated number of people with Major Depressive Disorder in your specified geographic area.</p>
                                <p>Percentage with TRD: Input your estimate of the percentage in your region of those people with MDD that are also treatement-resistant (2+ treatment failures).</p>
                                <p>Pateints with TRD: This value is calculated automatically using the percentage previously inputted.</p>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setInfo2Open(false)} variant="contained">
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Enter the number of people with Major Depressive Disorder (MDD) in your location and the percentage with Treatement-Resistant Depression (TRD)
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
                                    //onChange={handleInputChange}
                                    onValueChange={(values) => {
                                        const updatedMDD = values.value;
                                        setFormData((prev) => {
                                            const newData = { ...prev, MDD: updatedMDD };
                                            // Auto-calculate TRD when MDD changes
                                            newData.TRD = updatedMDD * (newData.TRD_P / 100);
                                            return newData;
                                        });
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
                                    label="Patients with TRD: 2+ Treatment Failures"
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
                        <Box display="flex" alignItems="center" justifyContent="center" gap={0}>
                            <Typography variant="h5">Exclusion Criteria in Your Geographic Location</Typography>
                            <IconButton onClick={() => setInfo3Open(true)}>
                                <InfoIcon />
                            </IconButton>
                        </Box>
                        {/* Popup Dialog */}
                        <Dialog
                            open={info3Open}
                            onClose={() => setInfo3Open(false)}
                            maxWidth="md"
                            fullWidth
                        >
                            <DialogTitle>More Information</DialogTitle>
                            <DialogContent>
                                <p>This section asks for data on patients with MDD that are not elligible for psylocibin use. The default values are based on real trial data. You should override these values only if you have reliable trial data from your geographic location. For more info see the "about" section of this website.</p>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setInfo3Open(false)} variant="contained">
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Enter the percentage of Major Depressive Disorder patients that have these listed conditions in your area
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

                    <Button
                        sx={{ backgroundColor: "#D3D3D3", color: "black", "&:hover": { backgroundColor: "#D3D3E4" } }}
                        variant="contained"
                        onClick={handleOpen}
                        size="small">
                        Adjust for Double Counting (Optional)
                    </Button>

                    {/* Dialog for Double Counting Section */}
                    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
                        <DialogTitle> Adjust Exclusion Criteria for Double Counting</DialogTitle>
                        <DialogContent>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                These inputs allow you flexibility to adjust for double counting if needed as some exclusion criteria overlap. The default values come from the same study in the "about" section and should only be changed if you have access to contradictory data or an expert in this field
                            </Typography>
                            <Typography variant="body2">
                                Psychological Problems: Percentage of MDD subjects with a mental disorder and/or a suicide attempt in the past year.
                            </Typography>
                            <Typography variant="body2">
                                Health Conditions: Percentage of MDD subjects with diabetes, stroke, heart attack in the last year, and/or high blood pressure (140+/90+ and treatement-resistant)
                            </Typography>
                            <Typography variant="body2">
                                Lower Hepatic Impairment: Percentage of MDD subjects with this condition.
                            </Typography>
                            <Paper elevation={2} sx={{ p: 3 }}>
                                <Grid container spacing={3}>
                                    {[
                                        ['psycological_P', 'Psychological Problems (Manic, Suicide)'],
                                        ['health_P', 'Health Conditions (Diabetes, Stroke, Heart Attack, BP+)'],
                                        ['comorbid_hepatic_P', 'Lower Hepatic Impairment'],
                                    ].map(([key, label]) => (
                                        <Grid item xs={12} sm={6} md={4} key={key}>
                                            <TextField
                                                fullWidth
                                                label={label}
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
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{ mt: 3 }}
                    >
                        Calculate Results
                    </Button>
                </Box>
            </form>

            {results && (
                <Paper elevation={2} sx={{ mt: 4, p: 3 }}>
                    <Grid container spacing={3} sx={{ mb: 2 }}>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>{formData.modelTitle} Results</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Prevalence Based on Trial Exclusion Criteria</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>PrevalenceBased on {formData.geographicArea} (Real World) Exclusion Criteria</Typography>
                        </Grid>
                    </Grid>

                    {/* MDD Results */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" sx={{ mt: 0, mb: 1 }}>Psylocybin Demand for Major Depressive Disorder</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">
                                        {parseInt(results.trial.MDD).toLocaleString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">
                                        {parseInt(results.real.MDD).toLocaleString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* TRD Results */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" sx={{ mt: 0, mb: 1 }}>Psylocybin Demand for Treatement-Resistant Depression</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">
                                        {parseInt(results.trial.TRD).toLocaleString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">
                                        {parseInt(results.real.TRD).toLocaleString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Button
                        color="primary"
                        type="submit"
                        variant="contained"
                        size="large"
                        onClick={handleDownload}
                    >
                        Download PDF
                    </Button>

                    {/* Comorbid Results */}
                    {/* <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>DC Results</Typography>
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
                    </Grid> */}
                </Paper>
            )
            }
        </Container >
    );
};

export default InputsForm;