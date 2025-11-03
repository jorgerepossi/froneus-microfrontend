import { Campaign, CampaignStatus } from "../types";

 
 
export const formatCampaignDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
 
export const getStatusLabel = (status: CampaignStatus): string => {
  const labelMap = {
    [CampaignStatus.WAITING]: 'En Espera',
    [CampaignStatus.ACTIVE]: 'Activa',
    [CampaignStatus.FINISHED]: 'Finalizada'
  };
  return labelMap[status];
};

 
export const getStatusSeverity = (status: CampaignStatus): 'warning' | 'success' | 'info' => {
  const severityMap = {
    [CampaignStatus.WAITING]: 'warning' as const,
    [CampaignStatus.ACTIVE]: 'success' as const,
    [CampaignStatus.FINISHED]: 'info' as const
  };
  return severityMap[status];
};

 
export const getTotalContacts = (campaign: Campaign): number => {
  return campaign.contacts.length;
};