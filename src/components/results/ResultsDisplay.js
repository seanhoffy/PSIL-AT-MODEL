import {
    Paper,
    Grid,
    Typography,
    Card,
    CardContent,
    Button,
    Stack,
} from '@mui/material';

const ResultsDisplay = ({ results, formData, onDownload, onSave, saving }) => {
    if (!results) return null;

    return (
        <Paper elevation={2} sx={{ mt: 4, p: 3 }}>
            <Grid container spacing={3} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={4}>
                    <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
                        {formData.modelTitle} Results
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                        Prevalence Based on Trial Exclusion Criteria
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                        Prevalence Based on {formData.geographicArea} (Real World) Exclusion Criteria
                    </Typography>
                </Grid>
            </Grid>

            {/* MDD Results */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" sx={{ mt: 0, mb: 1 }}>
                        Psylocybin Demand for Major Depressive Disorder
                    </Typography>
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
                    <Typography variant="h6" sx={{ mt: 0, mb: 1 }}>
                        Psylocybin Demand for Treatement-Resistant Depression
                    </Typography>
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
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                    color="primary"
                    type="submit"
                    variant="contained"
                    size="large"
                    onClick={onDownload}
                >
                    Download PDF
                </Button>
                <Button
                    color="primary"
                    variant="outlined"
                    size="large"
                    onClick={onSave}
                    disabled={saving}
                >
                    {saving ? 'Saving...' : 'Save to History'}
                </Button>
            </Stack>
        </Paper>
    );
};

export default ResultsDisplay;

