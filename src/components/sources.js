import { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";

const SourceInputList = () => {
    const [sources, setSources] = useState([""]);

    const addSourceField = () => {
        setSources([...sources, ""]);
    };

    const handleSourceChange = (index, value) => {
        const newSources = [...sources];
        newSources[index] = value;
        setSources(newSources);
    };

    return (
        <Grid container spacing={3} alignItems="center" sx={{ display: "flex", flexWrap: "wrap" }}>
            {sources.map((source, index) => (
                <Grid item xs={3} key={index}> {/* 4 inputs per row */}
                    <TextField
                        fullWidth
                        label={`Source ${index + 1}`}
                        variant="outlined"
                        value={source}
                        onChange={(e) => handleSourceChange(index, e.target.value)}
                    />
                </Grid>
            ))}

            {/* Button aligns next to the last input */}
            <Grid item>
                <Button onClick={addSourceField} variant="contained">
                    Add Source
                </Button>
            </Grid>
        </Grid>
    );
};

export default SourceInputList;
