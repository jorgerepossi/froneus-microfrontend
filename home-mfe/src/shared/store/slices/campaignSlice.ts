import { create } from "zustand";
import { persist } from 'zustand/middleware'
import { Campaign, CampaignFormData, CampaignStatus } from '../../types'
import { v4 as uuidv4 } from 'uuid';


interface CampaignStore {
    campaigns: Campaign[];
    addCampaign: (cdata: CampaignFormData) => Campaign;
    deleteCampaign: (id: string) => void;
}

const useCampaignStore = create<CampaignStore>()(
    persist(

        (set) => ({
            campaigns: [],
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
                set((state) => ({ campaigns: [...state.campaigns, newCampaign] }))
                return newCampaign
            },

            deleteCampaign: (id) => {
                set((state) => ({ campaigns: state.campaigns.filter(c => c.id !== id) }))
            },
        }),
        {
            name: 'campaign-storage',

        }
    ));

export {
    useCampaignStore
}