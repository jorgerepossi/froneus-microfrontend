export enum CampaignStatus {
    WAITING = "En Espera",
    ACTIVE = "Activa",
    FINISHED = "Finalizada",
}

export interface Contact {
    id: string,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    createdAt: Date,
    status: CampaignStatus,
}

export interface Campaign {
    id: string,
    name: string,
    createdAt: Date,
    startDateTime: Date,
    recordCall: boolean,
    status: CampaignStatus,
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


export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}