export enum CampainStatus {
    WAITING = "En Espera",
    ACTIVE = "Activa",
    FINISHED = "Finalizada",
}

export interface Contact {
    id: string,
    firstName: string,
    lastName: string,
    phone: string,
    createdAt: Date,
    status: CampainStatus
}

export interface Campaing {
    id: string,
    name: string,
    createdAt: Date,
    startDateTime: Date,
    recordCall: boolean,
    status: CampainStatus,
    contacts: Contact[]
}

export interface CampaignFormData {
    name: string,
    startDateTime: Date,
    recordCall: boolean,
}

export interface ContactFormData {
    firstName: string,
    lastName: string,
    phone: string,
}