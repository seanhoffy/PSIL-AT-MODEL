export const INFO_DIALOGS = {
    generalInfo: {
        title: 'More Information',
        content: [
            'Model Title: Give your model a name that is consistant with it\'s purpose.',
            'Geographic Area: Tell us which geographic location this model usage applies to.',
            'Motivation: Tell us why you are using our demand model.',
            'Comments: Please feel free to leave any additional questions or concerns here.',
        ],
    },
    prevalence: {
        title: 'More Information',
        content: [
            'The default values are based on estimates of the US population as a whole.',
            'Patients with MDD: Input your estimated number of people with Major Depressive Disorder in your specified geographic area.',
            'Percentage with TRD: Input your estimate of the percentage in your region of those people with MDD that are also treatement-resistant (2+ treatment failures).',
            'Pateints with TRD: This value is calculated automatically using the percentage previously inputted.',
        ],
    },
    exclusionCriteria: {
        title: 'More Information',
        content: [
            'This section asks for data on patients with MDD that are not elligible for psylocibin use. The default values are based on real trial data. You should override these values only if you have reliable trial data from your geographic location. For more info see the "about" section of this website.',
        ],
    },
};

