import NavBar from '../components/NavBar';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import '../App.css';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

const theme = createTheme({
    palette: {
        background: {
            default: '#328fa8',
        },
        primary: {
            main: '#282c34',
        },
    },
});

// ✅ works after you moved the PDF to public/docs
const docs = [
    { uri: `${process.env.PUBLIC_URL}/docs/ResearchPaper.pdf` },   // served by Firebase Hosting
];

const PDFPage = () => {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* This helps in applying consistent base styles */}
            <div className="App">
                <NavBar />
            </div>
            <div className="flex flex-col items-center">
                <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
            </div>
        </ThemeProvider>
    );
}

export default PDFPage;

