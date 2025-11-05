import React from 'react';
import { Button } from 'primereact/button';
import { Campaign, CampaignStatus } from '@/shared/types';



interface CampaignActionsProps {
  campaign: Campaign;
  canActivate: boolean; 
  canFinish: boolean;
  canDelete: boolean;
  canPause: boolean;    
  canResume: boolean;   
  onViewDetail: (id: string) => void;
  onActivate: (campaign: Campaign) => void;
  onEdit: (id: string) => void; 
  onPause: (campaign: Campaign) => void;
  onResume: (campaign: Campaign) => void;  
  onFinish: (campaign: Campaign) => void;
  onDelete: (campaign: Campaign) => void;
}

export const CampaignActions  = ({
  campaign,
  canActivate,
  canFinish,
  canDelete,
  canPause,
  canResume,
  onViewDetail,
  onActivate,
  onEdit,
  onPause,
  onResume,
  onFinish,
  onDelete
} : CampaignActionsProps ) => {

 

  return (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
      <Button
        icon="pi pi-eye"
        rounded
        outlined
        severity="info"
        onClick={() => onViewDetail(campaign.id)}
        tooltip="Ver detalle"
        tooltipOptions={{ position: 'top' }}
      />
      
     
      {canActivate && (
        <Button
          icon="pi pi-play"
          rounded
          outlined
          severity="success"
          onClick={() => onActivate(campaign)}
          tooltip="Activar campaña"
          tooltipOptions={{ position: 'top' }}
        />
      )}
        <Button
        icon="pi pi-pencil"
        rounded
        outlined
        severity="secondary"
        onClick={() => onEdit(campaign.id)}
        tooltip="Editar campaña"
        tooltipOptions={{ position: 'top' }}
      />
      
      {canPause && (
        <Button
          icon="pi pi-pause"
          rounded
          outlined
          severity="secondary"
          onClick={() => onPause(campaign)} 
          tooltip="Pausar campaña"
          tooltipOptions={{ position: 'top' }}
        />
      )}

      {campaign.status !==  CampaignStatus.WAITING ?  canResume && (
        <Button
          icon="pi pi-play"  
          rounded
          outlined
          severity="success"
          onClick={() => onResume(campaign)} 
          tooltip="Reanudar campaña"
          tooltipOptions={{ position: 'top' }}
        />
      ): ''}
      
      {canFinish && (
        <Button
          icon="pi pi-stop"
          rounded
          outlined
          severity="warning"
          onClick={() => onFinish(campaign)}
          tooltip="Finalizar campaña"
          tooltipOptions={{ position: 'top' }}
        />
      )}

      {canDelete && (
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => onDelete(campaign)}
          tooltip="Eliminar campaña"
          tooltipOptions={{ position: 'top' }}
        />
      )}
    </div>
  );
};
