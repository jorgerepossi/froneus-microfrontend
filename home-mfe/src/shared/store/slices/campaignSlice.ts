import { create } from "zustand"
import { Campaign, CampaignFormData, CampaignStatus } from "@/types"
import { v4 as uuidv4 } from 'uuid';


interface CampaignStore {
    campaings: Campaign[];
    addCampaign: (cdata: CampaignFormData) => Campaign;
    deleteCampaign: (id: string) => void;
}

const useCampaignStore = create<CampaignStore>((set) => ({
    campaings: [],
    addCampaign: (data) => {
        const newCampaign: Campaign = {
            id: uuidv4(),
            name: data.name,
            createdAt: new Date(),
            startDateTime: data.startDateTime,
            recordCall: data.recordCall,
            status: CampaignStatus.WAITING,
            contacts: []
        }
        set((state) => ({ campaings: [...state.campaings, newCampaign] }))
        return newCampaign
    },

    deleteCampaign(id) {
        set((state) => ({ campaings: state.campaings.filter(c => c.id !== id) }))
    },
}));

export {
    useCampaignStore
}