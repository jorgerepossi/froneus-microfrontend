import { useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
// @/Types
import { ContactFormData } from '../types';
// @/Store
import { useCampaignStore } from '../store';
// @/Utils
import { validateContactForm } from '../utils/validators';
import { useToast } from '../context/ToastContext';

const initFormValues: ContactFormData = {
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
}

const useContactDialog = (campaignId: string) => {
    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState<ContactFormData>(initFormValues);
    const { showSuccess, showError } = useToast();

 
    const {
        addContactToCampaign
    } = useCampaignStore();

    const resetForm = () => {
        setFormData(initFormValues);


    }

    const handleOpen = () => {
        setVisible(true);

    }

    const handleClose = () => {
        setVisible(false);
        resetForm()
    }

    const handleChange = (field: keyof ContactFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        
        }))
    }

    const handleSubmitFormData = () => {
        const validator = validateContactForm(formData);
        if(!validator.isValid){
            const firstError = Object.values(validator.errors)[0];
             showError('Error en la validación', firstError);
            return 
        }
        addContactToCampaign(campaignId, {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            email: formData.email
        })

        
        showSuccess('Exitoso!', 'Contacto agregado correctamente');

        handleClose();
    }

    return {
    
        visible,
        formData,
        handleOpen,
        handleClose,
        handleChange,
        handleSubmitFormData
    }
}
export {
    useContactDialog
}