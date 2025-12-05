import HomePage from "./routes/HomePage";
import LandingPage from "./routes/LandingPage";
import LoginPage from "./routes/LoginPage";
import Register from "./routes/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PDFPage from "./routes/research_paper";
import HistoryPage from "./routes/HistoryPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/researchpaper" element={<PDFPage />} />
      </Routes>
    </Router>
  );
}

export default App;