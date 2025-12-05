import React from 'react';
import NavBar from '../components/NavBar';
import { Box, Typography, Button } from '@mui/material';
import '../App.css';
import DownloadIcon from '@mui/icons-material/Download';
import ThemeProvider from '../components/common/ThemeProvider';
import { COLORS } from '../constants/colors';

const PDFPage = () => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = `${process.env.PUBLIC_URL}/ResearchPaper.pdf`;
        link.download = 'ResearchPaper.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <ThemeProvider>
            <div className="App">
                <NavBar />
            </div>
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                padding: '20px',
                backgroundColor: COLORS.primary,
                minHeight: 'calc(100vh - 80px)'
            }}>
                <Box sx={{ 
                    backgroundColor: 'white', 
                    padding: '20px', 
                    borderRadius: '8px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    width: '100%',
                    maxWidth: '1200px',
                    textAlign: 'center'
                }}>
                    <Typography variant="h5" sx={{ mb: 2, color: COLORS.primary }}>
                        Research Paper
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                        <Button
                            variant="contained"
                            startIcon={<DownloadIcon />}
                            onClick={handleDownload}
                            sx={{ 
                                backgroundColor: COLORS.primary,
                                '&:hover': {
                                    backgroundColor: COLORS.primaryHover
                                }
                            }}
                        >
                            Download PDF
                        </Button>
                    </Box>

                    <Box sx={{ 
                        width: '100%', 
                        height: '70vh',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        overflow: 'hidden'
                    }}>
                        <iframe
                            src={`${process.env.PUBLIC_URL}/ResearchPaper.pdf`}
                            width="100%"
                            height="100%"
                            style={{ border: 'none' }}
                            title="Research Paper PDF"
                        />
                    </Box>
                    
                    <Typography variant="body2" sx={{ mt: 2, color: '#666' }}>
                        If the PDF doesn't load in your browser, please use the download button above.
                    </Typography>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default PDFPage;

