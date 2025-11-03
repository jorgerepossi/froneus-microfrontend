import { create } from "zustand";
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid';
// @/Types
import { Campaign, CampaignFormData, CampaignStatus, Contact } from '../../types'
// @/MOck
import { mockCampaigns } from "../mock/campaignMockData";


interface CampaignStore {
    campaigns: Campaign[];
    addCampaign: (cdata: CampaignFormData) => Campaign;
    deleteCampaign: (id: string) => void;
    initializeMockData: () => void;

    activateCampaign: (id: string) => void;
    finishCampaign: (id: string) => void;
    getCampaignById: (id: string) => Campaign | undefined


    addContactToCampaign: (campaignId: string, contact: Omit<Contact, 'id' | 'createdAt' | 'status'>) => void;
    removeContactFromCampaign: (campaignId: string, contactId: string) => void;
    updateContact: (campaignId: string, contactId: string, contact: Partial<Omit<Contact, 'id' | 'createdAt' | 'status'>>) => void;


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

            activateCampaign: (id) => {
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
            finishCampaign: (id) => {
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

            addContactToCampaign: (campaignId, contactData) => {
                set((state) => ({
                    campaigns: state.campaigns.map(campaign => {
                        if (campaign.id === campaignId) {
                            const newContact: Contact = {
                                id: uuidv4(),
                                ...contactData,
                                createdAt: new Date(),
                                status: campaign.status
                            };
                            return {
                                ...campaign,
                                contacts: [...campaign.contacts, newContact]
                            };
                        }
                        return campaign;
                    })
                }));
            },
            removeContactFromCampaign: (campaignId, contactId) => { 
                set((state) => ({
                    campaigns: state.campaigns.map(campaign => {
                        if(campaign.id === campaignId){
                            return {
                                ...campaign,
                                contacts: campaign.contacts.filter(c => c.id !== contactId)
                            };
                        }
                        return campaign
                    })
                }))
            },
            updateContact: (campaignId, contactId, contactData) => {
                set((state) => ({
                    campaigns: state.campaigns.map(campaign => {
                        if (campaign.id === campaignId) {
                            return {
                                ...campaign,
                                contacts: campaign.contacts.map(contact => 
                                    contact.id === contactId 
                                        ? { ...contact, ...contactData }
                                        : contact
                                )
                            };
                        }
                        return campaign;
                    })
                }))
            }
        }),
        {
            name: 'campaign-storage',

        }
    ));

export {
    useCampaignStore
}