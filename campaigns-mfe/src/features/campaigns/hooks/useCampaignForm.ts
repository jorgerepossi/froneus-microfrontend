import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @/Shared
import { useToast } from '@/shared/context/ToastContext';
import { useCampaignStore } from '../../../shared/store';
import { CampaignFormData } from '@/shared/types';
import { validateCampaignForm } from '@/shared/utils/validators';

const initialFormData: CampaignFormData = {
    name: '',
    startDateTime: new Date(),
    recordCall: false
};


export const useCampaignForm = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { showSuccess, showError } = useToast();
    const { createCampaign, getCampaignById, updateCampaign } = useCampaignStore();

    const [formData, setFormData] = useState<CampaignFormData>(initialFormData);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (id) {
            const campaign = getCampaignById(id);
            if (campaign) {
                setFormData({
                    name: campaign.name,
                    startDateTime: campaign.startDateTime,
                    recordCall: campaign.recordCall
                });
                setIsEditMode(true);
            } else {
                showError('Error', 'Campaña no entontrada');
                navigate('/');
            }
        }
    }, [id])

    const handleChange = (field: keyof CampaignFormData, value: any) => {
        setFormData((prev) => (
            {
                ...prev,
                [field]: value
            }
        ));

    }

    const handleSubmit = () => {
        const validation = validateCampaignForm(formData);

        if (!validation.isValid) {
            const firstError = Object.values(validation.errors)[0];
            showError('Error de validación', firstError);
            return;
        }

        if (isEditMode && id) {
            updateCampaign(id, formData);
            showSuccess('Éxito', 'La Campaña fue actualizada correctamente');
        } else {
            createCampaign(formData);
            showSuccess('Éxito', 'La Campaña fue creada correctamente');
        }

        setTimeout(() => {
            window.history.pushState({}, '', '/');
            window.dispatchEvent(new PopStateEvent('popstate'));
        }, 1500);
    }

    const handleCancel = () => {
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
    };


    return {
        formData,
        isEditMode,
        handleSubmit,
        handleCancel,
        handleChange,
    }

}