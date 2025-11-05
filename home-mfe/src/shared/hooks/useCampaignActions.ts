import { useState } from "react"
import { useNavigate } from "react-router-dom"
// @/Store
import { useCampaignStore } from "../store"
// @/Types
import { Campaign } from "@/types"
import { useToast } from "../context/ToastContext"
import { 
    canActivateCampaign, 
    canDeleteCampaign, 
    canFinishCampaign,

    canPauseCampaign,
    canResumeCampaign
} from "../utils/validators"


export const useCampaignActions = () => {
    const navigate = useNavigate();
    const { showSuccess, showError } = useToast();

    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [campaignToDelete, setCampaignToDelete] = useState<Campaign | null>(null);



    const handleVieDetail = (campaignId: string) => {
        navigate(`/campaign/${campaignId}`);
    }

    const handleActivate = (campaign: Campaign) => {
        if (!canActivateCampaign(campaign.status)) {
            showError("Acción no permitida", "La campaña porque no cumple con los requisitos ")
            return;
        }
        activateCampaign(campaign.id)
        showSuccess("Campaña activada", "La campaña se ha activado correctamente")
    }

    const handlePauseCampaign = (campaign: Campaign) => {
        if (!canPauseCampaign(campaign.status)) {
            showError("Acción no permitida", "La campaña no se puede pausar en su estado actual.")
            return;
        }
        pauseCampaign(campaign.id);
        showSuccess("Campaña pausada", "La campaña se ha pausado correctamente.");
    }

    const handleResumeCampaign = (campaign: Campaign) => {
        if (!canResumeCampaign(campaign.status)) {
            showError("Acción no permitida", "La campaña no se puede reanudar en su estado actual.")
            return;
        }
        resumeCampaign(campaign.id);
        showSuccess("Campaña reanudada", "La campaña se ha reanudado y está activa.");
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
        deleteCampaign,
 
        pauseCampaign,
        resumeCampaign
    } = useCampaignStore()

    return {
        actions: {
            handleVieDetail,
            handleActivate,
            handleFinish,
            handleDeleteClick,
            handlePauseCampaign,
            handleResumeCampaign
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
            canDelete: canDeleteCampaign,
            canPause: canPauseCampaign,
            canResume: canResumeCampaign
        }
    }
}
