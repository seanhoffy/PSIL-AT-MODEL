import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Define styles for the PDF
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    section: {
        marginBottom: 10,
        padding: 10,
        borderBottom: "1px solid #000",
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    text: {
        fontSize: 12,
    },
    table: {
        display: 'table',
        width: '100%',  // Full width
        marginTop: 30,  // Added extra margin
        border: '1px solid #000',  // Box around the whole table
        borderRadius: 5, // Optional: Rounded corners for the table box
    },
    tableRow: {
        flexDirection: 'row',
        borderBottom: '1px solid #000', // Line between rows
    },
    tableCell: {
        width: '33.33%', // Each column takes 1/3 of the table's width
        padding: 10,  // Increased padding for more space
        textAlign: 'center',
        borderRight: '1px solid #000', // Line between columns
    },
    tableHeader: {
        fontWeight: 'bold',
        backgroundColor: '#f2f2f2', // Light grey background for header
    },
    tableLastCell: {
        borderRight: 'none', // No right border for the last cell
    },
});

// PDF Document Component
const MyDocument = ({ formData, results }) => {
    if (!formData) {
        return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <Text>Loading...</Text>
                </Page>
            </Document>
        );
    }

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={[styles.title, { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }]}>
                        PSWEET Model Results
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>Model Title:</Text>
                    <Text style={styles.text}>{formData.modelTitle || "N/A"}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>Geographic Area:</Text>
                    <Text style={styles.text}>{formData.geographicArea || "N/A"}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>Motivation:</Text>
                    <Text style={styles.text}>{formData.motivation || "N/A"}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>Additional Comments:</Text>
                    <Text style={styles.text}>{formData.additionalComments || "N/A"}</Text>
                </View>

                {/* Table for Results */}
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCell, styles.tableHeader]}>
                            <Text>Disorder</Text>
                        </View>
                        <View style={[styles.tableCell, styles.tableHeader]}>
                            <Text>Our Trial Data</Text>
                        </View>
                        <View style={[styles.tableCell, styles.tableHeader]}>
                            <Text>{formData.geographicArea} Data</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCell}>
                            <Text>Major Depressive Disorder</Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text>{new Intl.NumberFormat().format(results.trial.MDD) || "N/A"}</Text>
                        </View>
                        <View style={[styles.tableCell, styles.tableLastCell]}>
                            <Text>{new Intl.NumberFormat().format(results.real.MDD) || "N/A"}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCell}>
                            <Text>Treatment-Resistant Depression</Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text>{new Intl.NumberFormat().format(results.trial.TRD) || "N/A"}</Text>
                        </View>
                        <View style={[styles.tableCell, styles.tableLastCell]}>
                            <Text>{new Intl.NumberFormat().format(results.real.TRD) || "N/A"}</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default MyDocument;
