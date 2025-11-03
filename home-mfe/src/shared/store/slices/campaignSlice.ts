import { create } from "zustand";
import { persist } from 'zustand/middleware'
import { Campaign, CampaignFormData, CampaignStatus } from '../../types'
import { v4 as uuidv4 } from 'uuid';
import { mockCampaigns } from "../mock/campaignMockData";


interface CampaignStore {
    campaigns: Campaign[];
    addCampaign: (cdata: CampaignFormData) => Campaign;
    deleteCampaign: (id: string) => void;
    initializeMockData: () => void;

    activateCampaign: (id: string) => void;
    finishCampaign: (id: string) => void;
    getCampaignById: (id: string) => Campaign | undefined
}

const useCampaignStore = create<CampaignStore>()(
    persist(

        (set, get) => ({
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


            initializeMockData: () => {
                set({ campaigns: mockCampaigns });
            },
            activateCampaign: (id) =>{
                set((state) => (
                    {
                        campaigns: state.campaigns.map(c => {
                            if (c.id === id) {
                                return { ...c, status: CampaignStatus.ACTIVE }
                            }
                            return c
                        })
                    }
                ))
            },
            finishCampaign: (id) =>{
                set((state) => ({
                    campaigns: state.campaigns.map(c => {
                        if (c.id === id) {
                            return { ...c, status: CampaignStatus.FINISHED }
                        }
                        return c
                    })
                }))
            },
            getCampaignById: (id) => {
                return get().campaigns.find(c => c.id === id);
            },
        }),
        {
            name: 'campaign-storage',

        }
    ));

export {
    useCampaignStore
}