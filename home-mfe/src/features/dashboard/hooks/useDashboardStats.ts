import { useCampaignStore } from "@/shared/store";
import { CampaignStatus } from "@/shared/types";
import { useMemo } from "react"

const useDashboardStats = () => {
    const { campaigns } = useCampaignStore()

    const stats = useMemo(() => ({
        totalCampaigns: campaigns.length,
        totalContacts: campaigns.reduce((sum, camp) => sum + camp.contacts.length, 0),

        waitingCampaigns: campaigns.filter(campaign => campaign.status === CampaignStatus.WAITING).length,
        activeCampaigns: campaigns.filter(campaign => campaign.status === CampaignStatus.ACTIVE).length,
        finishedCampaigns: campaigns.filter(campaign => campaign.status === CampaignStatus.FINISHED).length,

        waitingContacts: campaigns
            .flatMap(c => c.contacts)
            .filter(contact => contact.status === CampaignStatus.WAITING)
            .length,
        
        activeContacts: campaigns
            .flatMap(c => c.contacts)
            .filter(contact => contact.status === CampaignStatus.ACTIVE)
            .length,
        
        finishedContacts: campaigns
            .flatMap(c => c.contacts)
            .filter(contact => contact.status === CampaignStatus.FINISHED)
            .length,

    }), [campaigns])
    
    return stats;
}

export {
    useDashboardStats
}