import { AppBar, Toolbar, Typography, Box, ButtonBase } from '@mui/material';
import { useNavigate } from "react-router-dom";

const SimpleNavBar = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="static" sx={{ height: '80px', backgroundColor: '#FFFFFF', color: '#000000' }}>
            <Toolbar sx={{ height: '100%' }}>
                <ButtonBase onClick={() => navigate('/')}>
                    <Box component="img"
                        src="/cepLogo2.png"
                        alt="CEP Logo"
                        sx={{
                            height: 60,
                            width: 'auto',
                            objectFit: 'contain',
                            marginRight: 2
                        }}
                    />
                </ButtonBase>
                <Typography variant="h5" component="div" sx={{ color: '#000000' }}>
                    PATpath.org
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default SimpleNavBar; 