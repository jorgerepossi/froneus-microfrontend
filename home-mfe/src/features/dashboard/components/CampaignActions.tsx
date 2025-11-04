// src/features/dashboard/components/CampaignActions.tsx
import React from 'react';
import { Button } from 'primereact/button';
import { Campaign } from '@/shared/types';


interface CampaignActionsProps {
  campaign: Campaign;
  canActivate: boolean;
  canFinish: boolean;
  canDelete: boolean;
  onViewDetail: (id: string) => void;
  onActivate: (campaign: Campaign) => void;
  onFinish: (campaign: Campaign) => void;
  onDelete: (campaign: Campaign) => void;
}

export const CampaignActions: React.FC<CampaignActionsProps> = ({
  campaign,
  canActivate,
  canFinish,
  canDelete,
  onViewDetail,
  onActivate,
  onFinish,
  onDelete
}) => {
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