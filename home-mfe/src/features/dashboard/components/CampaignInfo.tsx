import React from 'react';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
 
import { 
    formatCampaignDate, 
    getStatusLabel, 
    getStatusSeverity, 
    getTotalContacts 
} from '@/shared/utils/campaignHelpers';

// @/Types
import { Campaign } from '@/shared/types';
 

interface CampaignInfoProps {
  campaign: Campaign;
}

 const CampaignInfo  = ({ campaign }: CampaignInfoProps) => {
  return (
    <Card title={campaign.name}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div>
          <strong>Estado:</strong>{' '}
          <Tag 
            value={getStatusLabel(campaign.status)} 
            severity={getStatusSeverity(campaign.status)}
          />
        </div>
        <div>
          <strong>Fecha de Creación:</strong>{' '}
          {formatCampaignDate(campaign.createdAt)}
        </div>
        <div>
          <strong>Fecha de Inicio:</strong>{' '}
          {formatCampaignDate(campaign.startDateTime)}
        </div>
        <div>
          <strong>Grabar Llamadas:</strong> {campaign.recordCall ? 'Sí' : 'No'}
        </div>
        <div>
          <strong>Total de Contactos:</strong> {getTotalContacts(campaign)}
        </div>
      </div>
    </Card>
  );
};

export {
    CampaignInfo
}