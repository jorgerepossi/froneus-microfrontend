import { useRef } from 'react';
import {
    useNavigate,
    useParams
} from "react-router-dom"



import { Toast } from 'primereact/toast';
import { useCampaignStore } from '../store';


const useCampaignDetail = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);

    const {
        getCampaignById,
        removeContactFromCampaign
    } = useCampaignStore();


    const campaign = getCampaignById(id || "");

    const handleBack = () => {
        navigate('/');
    };

    const handleDeleteContact = (contactId: string) => {
        if (!campaign) return;
        removeContactFromCampaign(campaign.id, contactId);
        toast.current?.show({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Contacto eliminado correctamente',
            life: 3000
        });
    }

    return {
        toast,
        campaign,
        handleBack,
        handleDeleteContact

    }
}

export {
    useCampaignDetail
}
