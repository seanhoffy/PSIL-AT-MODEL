import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    FormControlLabel,
    Checkbox,
    Box,
} from '@mui/material';

const DisclaimerDialog = ({ open, onClose, onProceed, disclaimerChecked, onDisclaimerChange }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>Confirmation Required</DialogTitle>
            <DialogContent>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    Before proceeding with the calculation, please confirm:
                </Typography>
                <Box
                    sx={{
                        border: '1.5px solid #f0ad4e',
                        borderRadius: 2,
                        p: 2,
                        mb: 2,
                        backgroundColor: '#fffaf0',
                    }}
                >
                    <Typography variant="body1" fontWeight="bold" sx={{ color: '#333' }}>
                        CEP does not take responsibility for user-provided inputs or the resulting model outputs. The relevance and accuracy of results depend on entering appropriate inputs and interpreting the outputs with professional judgment.
                    </Typography>
                </Box>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={disclaimerChecked}
                            onChange={onDisclaimerChange}
                            color="primary"
                        />
                    }
                    label="I understand what each input to this model does and have read the information provided from the info buttons in each subsection."
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        marginLeft: 0,
                        '.MuiFormControlLabel-label': {
                            fontSize: '0.9rem',
                            lineHeight: 1.4,
                            marginLeft: 1,
                        },
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={onProceed}
                    color="primary"
                    variant="contained"
                    disabled={!disclaimerChecked}
                >
                    Proceed
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DisclaimerDialog;

