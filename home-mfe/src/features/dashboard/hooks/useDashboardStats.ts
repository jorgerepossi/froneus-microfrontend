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

        waitingContacts: campaigns.filter(c => c.status === CampaignStatus.WAITING).reduce((sum, c) => sum + c.contacts.length, 0),
        activeContacts: campaigns.filter(c => c.status === CampaignStatus.ACTIVE).reduce((sum, c) => sum + c.contacts.length, 0),
        finishedContacts: campaigns.filter(c => c.status === CampaignStatus.FINISHED).reduce((sum, c) => sum + c.contacts.length, 0),

    }), [campaigns])
    return stats;
}
export {
    useDashboardStats
}