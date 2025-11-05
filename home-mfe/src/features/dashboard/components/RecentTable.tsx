
import React from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Campaign } from '@/shared/types';

import { getStatusLabel, getStatusSeverity, formatCampaignDate } from '@/shared/utils/campaignHelpers';
import { useCampaignActions } from '@/shared/hooks/useCampaignActions';
import { CampaignActions } from './CampaignActions';
import { DeleteCampaignDialog } from './DeleteCampaignDialog';
 

interface RecentTableProps {
  campaigns: Campaign[];
}

export const RecentTable  = ({ campaigns }: RecentTableProps) => {

  const { deleteDialog, actions, validators } = useCampaignActions();

  const statusBodyTemplate = (campaign: Campaign) => {
    return (
      <Tag
        value={getStatusLabel(campaign.status)}
        severity={getStatusSeverity(campaign.status)}
      />
    );
  };


  const dateBodyTemplate = (campaign: Campaign) => {
    return formatCampaignDate(campaign.createdAt);
  };

  
  const actionBodyTemplate = (campaign: Campaign) => {
    return (
     <CampaignActions 
        campaign={campaign}
        canActivate={validators.canActivate(campaign.status)}
        canFinish={validators.canFinish(campaign.status)}
        canDelete={validators.canDelete(campaign.status)}
        canPause={validators.canPause(campaign.status)}
        canResume={validators.canResume(campaign.status)}
        onEdit={actions.handleEdit}
        onPause={actions.handlePauseCampaign}
        onResume={actions.handleResumeCampaign}
        onViewDetail={actions.handleVieDetail}
        onActivate={actions.handleActivate}
        onFinish={actions.handleFinish}
        onDelete={actions.handleDeleteClick}
       />
    );
  };

  return (
    <>
    <Card title="Campañas Recientes" style={{ marginTop: '20px' }}>
      <DataTable
        value={campaigns}
        stripedRows
        paginator
        rows={10}
        emptyMessage="No hay campañas disponibles"
      >
        <Column field="name" header="Nombre" sortable />
        <Column
          header="Estado"
          body={statusBodyTemplate}
          sortable
          sortField="status"
        />
        <Column
          header="Fecha de Creación"
          body={dateBodyTemplate}
          sortable
          sortField="createdAt"
        />
        <Column field="contacts.length" header="Contactos" sortable />
        <Column
          header="Acciones"
          body={actionBodyTemplate}
          style={{ width: '120px', textAlign: 'center' }}
        />
      </DataTable>
    </Card>
    <DeleteCampaignDialog
    visible={deleteDialog.visible}
    campaign={deleteDialog.campaign}
    onConfirm={deleteDialog.onConfirm}
    onCancel={deleteDialog.onCancel}
    />
    </>
  );
};