import { useCampaignDetail } from "@/shared/hooks/useCampaignDetail";
import { useCampaignStore } from "@/shared/store";
import React, { useState } from "react"
 
import { Button } from 'primereact/button';


const CampaignDetail = () => {
    const {
        toast,
        campaign,
        handleBack,
        handleDeleteContact
    } = useCampaignDetail()

    const { getCampaignById, addContactToCampaign} = useCampaignStore()

    if(!campaign){
        return(
            <div>
                <h2>Campaña no encontrada</h2>
                 <Button label="Volver al Dashboard" onClick={handleBack} />
            </div>
        )
    }

    return (
        <div>
            <h1>Detail</h1>
        </div>
    )
}

export default CampaignDetail;