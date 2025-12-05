import { STRING_FIELD_NAMES } from '../constants/formFields';

/**
 * Check if a field name is a string field
 */
export const isStringField = (fieldName) => {
    return STRING_FIELD_NAMES.includes(fieldName);
};

/**
 * Validate form data before submission
 */
export const validateFormData = (formData) => {
    if (!formData.modelTitle || formData.modelTitle.trim() === '') {
        return { isValid: false, message: 'Please fill out all required fields.' };
    }
    if (!formData.geographicArea || formData.geographicArea.trim() === '') {
        return { isValid: false, message: 'Please fill out all required fields.' };
    }
    if (!formData.motivation || formData.motivation.trim() === '') {
        return { isValid: false, message: 'Please fill out all required fields.' };
    }
    return { isValid: true };
};

