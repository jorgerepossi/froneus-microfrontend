import { useState } from "react"
import { useNavigate } from "react-router-dom"
// @/Store
import { useCampaignStore } from "@/store"
// @/Types
import { Campaign } from "@/types"
import { useToast } from "../context/ToastContext"
import { canActivateCampaign, canDeleteCampaign, canFinishCampaign } from "../utils/validators"


export const useCampaignActions = () => {
    const navigate = useNavigate();
    const { showSuccess, showError } = useToast();

    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [campaignToDelete, setCampaignToDelete] = useState<Campaign | null>(null);



    const handleVieDetail = (campaignId: string) => {
        navigate(`/campaigns/${campaignId}`);
    }

    const handleActivate = (campaign: Campaign) => {
        if (!canActivateCampaign(campaign.status)) {
            showError("Acción no permitida", "La campaña porque no cumple con los requisitos ")
            return;
        }
        activateCampaign(campaign.id)
        showSuccess("Campaña activada", "La campaña se ha activado correctamente")
    }

    const handleFinish = (campaign: Campaign) => {
        if (!canFinishCampaign(campaign.status)) {
            showError("Acción no permitida", "La campaña porque no cumple con los requisitos ")
            return;
        }
        finishCampaign(campaign.id)
        showSuccess("Campaña finalizada", "La campaña se ha finalizado correctamente")
    }

    const handleDeleteClick = (campaign: Campaign) => {
        if (!canDeleteCampaign(campaign.status)) {
            showError("Acción no permitida", "No se puede eliminar las campañas en espera ")
            return;
        }
        setCampaignToDelete(campaign)
        setDeleteDialogVisible(true)
    }

    const closeDeleteDialog = () => {
        setDeleteDialogVisible(false);
        setCampaignToDelete(null);
    };

    const confirmDelete = () => {
        if (campaignToDelete) {
            deleteCampaign(campaignToDelete.id)
            showSuccess("Campaña eliminada", "La campaña se ha eliminado correctamente")
            closeDeleteDialog()
        }
    }

    const {
        activateCampaign,
        finishCampaign,
        deleteCampaign

    } = useCampaignStore()

    return {
        actions: {
            handleVieDetail,
            handleActivate,
            handleFinish,
            handleDeleteClick
        },
        deleteDialog: {
            visible: deleteDialogVisible,
            campaign: campaignToDelete,
            onConfirm: confirmDelete,
            onCancel: closeDeleteDialog,
        },
        validators: {
            canActivate: canActivateCampaign,
            canFinish: canFinishCampaign,
            canDelete: canDeleteCampaign
        }

    }
}