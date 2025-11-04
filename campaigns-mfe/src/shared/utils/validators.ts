import { CampaignFormData, CampaignStatus, ContactFormData, ValidationResult } from "../types";

/**
 * Froneus Challenge Notation to Jorge Repossi
 * 
 * @param { string } data.firstName -  The first name is required and must be at least 3 characters long.
 * @abstract The first name must contain only letters
 * @returns { ValidationResult } - The result of the validation
 * @example
 * // Valid FirstName
 * const data = { firstName: 'John' };
 * 
 */
const validateContactForm = (data: Partial<ContactFormData>): ValidationResult => {
    const errors: Record<string, string> = {};
    const lastNameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/;

    if (!data.firstName || data.firstName.trim() === '') {
        errors.firstName = "El nombre es obligatorio";
    } else if (data.firstName.length < 3) {
        errors.firstName = "El nombre debe tener al menos 3 caracteres";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(data.firstName)) {
        errors.firstName = 'El nombre solo puede contener letras';
    }

    /**
     * Froneus Challenge Notation to Jorge Repossi
     * 
     * @param { string } data.lastName -  The last name is required and must be at least 3 characters long.
     * @abstract The last name must contain only letters
     * @returns { ValidationResult } - The result of the validation
     * @example
     * // Valid LastName
     * const data = { lastName: "Doe", "O'Connor" };
     * 
     */
    if (!data.lastName || data.lastName.trim() === '') {
        errors.lastName = "El apellido es obligatorio";
    } else if (data.lastName.length < 3) {
        errors.lastName = "El apellido debe tener al menos 3 caracteres";
    } else if (!lastNameRegex.test(data.lastName)) {
        errors.lastName = 'El apellido solo puede contener letras, guiones y apóstrofos';
    }

    /**
     * Froneus Challenge Notation to Jorge Repossi
     * 
     * @param {string} data.phone - The phone is required, and must be at least 8 digits long.
     * @abstract The phone must contain only numbers and be between 8 and 15 digits
     * @returns { ValidationResult } - The result of the validation
     * @example
     * // Valid Phone
     * const data = { phone: "1123456789" };
     * 
     */
    if (!data.phone || data.phone.trim() === '') {
        errors.phone = 'El teléfono es obligatorio';
    } else {
        const cleanPhone = data.phone.replace(/\D/g, '');

        if (cleanPhone.length < 8) {
            errors.phone = 'El teléfono debe tener al menos 8 dígitos';
        } else if (cleanPhone.length > 15) {
            errors.phone = 'El teléfono no puede tener más de 15 dígitos';
        } else if (!/^\d+$/.test(cleanPhone)) {
            errors.phone = 'El teléfono solo puede contener números';
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

/**
 * Froneus Challenge Notation to Jorge Repossi
 * 
 * @param {CampaignFormData} data - Campaign form data to validate
 * @param {string} data.name - Campaign name (required, min 3 chars)
 * @param {Date} data.startDateTime - Start date and time (required, must be future)
 * @param {boolean} data.recordCall - Record calls flag (required)
 * @returns {ValidationResult} Validation result with isValid and errors
 * @example
 * // Valid campaign
 * const data = { 
 *   name: "Campaña Q1", 
 *   startDateTime: new Date('2025-12-01'), 
 *   recordCall: true 
 * };
 */
const validateCampaignForm = (data: Partial<CampaignFormData>): ValidationResult => {
    const errors: Record<string, string> = {};

    if (!data.name || data.name.trim() === '') {
        errors.name = 'El nombre de la campaña es obligatorio';
    } else if (data.name.length < 3) {
        errors.name = 'El nombre de la campaña debe tener al menos 3 caracteres';
    } else if (data.name.length > 100) {
        errors.name = 'El nombre no puede exceder 100 caracteres';
    }

    if (!data.startDateTime) {
        errors.startDateTime = "La fecha y hora de inicio es obligatoria";
    } else {
        const startDate = new Date(data.startDateTime);
        const now = new Date();

        if (isNaN(startDate.getTime())) {
            errors.startDateTime = 'Fecha y hora inválida';
        } else if (startDate < now) {
            errors.startDateTime = 'La fecha y hora debe ser futura';
        }
    }

    if (data.recordCall === undefined || data.recordCall === null) {
        errors.recordCall = 'Debe indicar si se grabarán las llamadas';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

/**
 * Froneus Challenge Notation to Jorge Repossi
 * 
 * * Validates whether a campaign can be deleted.
 * A campaign can only be deleted if its status is WAITING.
 * * @param {CampaignStatus} status - The current status of the campaign.
 * @returns {boolean} - true if the campaign is eligible for deletion.
 */

const canDeleteCampaign = (status: CampaignStatus): boolean => {
    return status === CampaignStatus.WAITING;
};

/**
 * Froneus Challenge Notation to Jorge Repossi
 * 
 * Validates whether a campaign can be activated.
 * It can only be activated if its status is WAITING.
 * * @param {CampaignStatus} status - The current status of the campaign.
 * @returns {boolean} - true if the campaign is eligible for activation.
 */

const canActivateCampaign = (status: CampaignStatus): boolean => {
    return status === CampaignStatus.WAITING;
};

/**
 * Froneus Challenge Notation to Jorge Repossi
 * 
 * Validates whether a campaign can be finalized.
 * It can only be finalized if its status is ACTIVE.
 *
 * @param {CampaignStatus} status - The current status of the campaign.
 * @returns {boolean} - true if the campaign is eligible for finalization.
 */

const canFinishCampaign = (status: CampaignStatus): boolean => {
    return status === CampaignStatus.ACTIVE;
};

/**
 * Froneus Challenge Notation to Jorge Repossi
 * 
 * Validates whether a campaign's basic data can be edited.
 * Based on the challenge: basic data can only be modified if the campaign is in WAITING status.
 *
 * @param {CampaignStatus} status - The current status of the campaign.
 * @returns {boolean} - true if basic data can be edited.
 */

const canEditCampaignData = (status: CampaignStatus): boolean => {
    return status === CampaignStatus.WAITING;
};

/**
 * Froneus Challenge Notation to Jorge Repossi
 * 
 * Validates whether contacts can be added to a campaign.
 * Based on the challenge: "When a campaign is edited, only new people can be added to call."
 * This implies that contacts can be added in any status.
 *
 * @param {CampaignStatus} status - The current status of the campaign.
 * @returns {boolean} - true if contacts can be added.
 */
const canAddContacts = (status: CampaignStatus): boolean => {
    return true; // Se pueden agregar contactos en cualquier estado
};

/**
 * Froneus Challenge Notation to Jorge Repossi
 * 
 * Validates whether a contact's data is complete.
 * Checks for the minimum required fields.
 *
 * @param {object} contact - The contact data to validate.
 * @returns {boolean} - true if the data is complete.
 */
const isContactDataComplete = (contact: {
    firstName?: string;
    lastName?: string;
    phone?: string;
}): boolean => {
    return !!(
        contact.firstName?.trim() &&
        contact.lastName?.trim() &&
        contact.phone?.trim()
    );
};

export {
    validateContactForm,
    validateCampaignForm,
    canDeleteCampaign,
    canActivateCampaign,
    canFinishCampaign,
    canEditCampaignData,
    canAddContacts,
    isContactDataComplete
};