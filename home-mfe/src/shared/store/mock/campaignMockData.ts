import { Campaign, CampaignStatus } from "@/shared/types";
import { v4 as uuidv4 } from 'uuid';

const mockCampaigns: Campaign[] = [
    {
        id: uuidv4(),
        name: "Summer Sale Campaign",
        createdAt: new Date(),
        startDateTime: new Date(),
        recordCall: true,
        status: CampaignStatus.WAITING,
        contacts: []
    },
    {
        id: uuidv4(),
        name: "Product Launch Campaign",
        createdAt: new Date(),
        startDateTime: new Date(),
        recordCall: true,
        status: CampaignStatus.FINISHED,
        contacts: []
    },
    {
        id: uuidv4(),
        name: "Customer Feedback Survey",
        createdAt: new Date(),
        startDateTime: new Date(),
        recordCall: false,
        status: CampaignStatus.WAITING,
        contacts: []
    },
    {
        id: uuidv4(),
        name: "Holiday Promotion",
        createdAt: new Date(),
        startDateTime: new Date(),
        recordCall: true,
        status: CampaignStatus.WAITING,
        contacts: [
            {
                id: uuidv4(),
                firstName: 'Roberto',
                lastName: 'Silva',
                phone: '+541178901234',
                email: 'roberto.silva@example.com',
                createdAt: new Date(),
                status: CampaignStatus.WAITING
            }
        ]
    },
    {
        id: uuidv4(),
        name: "New Year Campaign",
        createdAt: new Date(),
        startDateTime: new Date(),
        recordCall: true,
        status: CampaignStatus.ACTIVE,
        contacts: []
    }
]

export {
    mockCampaigns
}