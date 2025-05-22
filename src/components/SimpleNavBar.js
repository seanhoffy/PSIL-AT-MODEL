import { AppBar, Toolbar, Typography, Box, ButtonBase } from '@mui/material';
import logo from '../logo.svg';
import { useNavigate } from "react-router-dom";

const SimpleNavBar = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="static" sx={{ height: '80px', bgcolor: '#282c34' }}>
            <Toolbar sx={{ height: '100%' }}>
                <ButtonBase onClick={() => navigate('/')}>
                    <Box component="img"
                        src={logo}
                        alt="logo"
                        sx={{
                            height: 60,
                            width: 60,
                            marginRight: 2
                        }}
                    />
                </ButtonBase>
                <Typography variant="h5" component="div">
                    PSWEET
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default SimpleNavBar; 