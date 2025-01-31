import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import Register from "./Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
    // <ThemeProvider theme={theme}>
    //   <CssBaseline /> {/* This helps in applying consistent base styles */}
    //   <div className="App">
    //     <AppBar position="static" sx={{ height: '80px' }}>
    //       <Toolbar sx={{ height: '100%' }}>
    //         <Box component="img"
    //           src={logo}
    //           alt="logo"
    //           sx={{
    //             height: 60,
    //             width: 60,
    //             marginRight: 2
    //           }}
    //         />
    //         <Typography variant="h6" component="div">
    //           PSIL-AT Demand Model
    //         </Typography>
    //       </Toolbar>
    //     </AppBar>
    //     <InputsForm />
    //   </div>
    // </ThemeProvider>
  );
}

export default App;