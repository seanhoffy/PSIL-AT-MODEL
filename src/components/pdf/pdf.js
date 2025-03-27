import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Define styles for the PDF
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 20
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
    }
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
                <View style={styles.section}>
                    <Text style={styles.title}>MDD Trial:</Text>
                    <Text style={styles.text}>{results.trial.MDD.toString() || "N/A"}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>MDD {formData.geographicArea}:</Text>
                    <Text style={styles.text}>{results.real.MDD.toString() || "N/A"}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>TRD Trial:</Text>
                    <Text style={styles.text}>{results.trial.TRD.toString() || "N/A"}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>TRD {formData.geographicArea}:</Text>
                    <Text style={styles.text}>{results.real.TRD.toString() || "N/A"}</Text>
                </View>
            </Page>
        </Document>
    );
};

export default MyDocument;
