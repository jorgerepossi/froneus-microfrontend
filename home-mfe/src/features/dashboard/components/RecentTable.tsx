// src/features/dashboard/components/RecentTable.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { Campaign } from '@/shared/types';
import { getStatusLabel, getStatusSeverity, formatCampaignDate } from '@/shared/utils/campaignHelpers';
 

interface RecentTableProps {
  campaigns: Campaign[];
}

export const RecentTable: React.FC<RecentTableProps> = ({ campaigns }) => {
  const navigate = useNavigate();

  // Template para el estado
  const statusBodyTemplate = (campaign: Campaign) => {
    return (
      <Tag
        value={getStatusLabel(campaign.status)}
        severity={getStatusSeverity(campaign.status)}
      />
    );
  };

  // Template para la fecha
  const dateBodyTemplate = (campaign: Campaign) => {
    return formatCampaignDate(campaign.createdAt);
  };

  // Template para acciones
  const actionBodyTemplate = (campaign: Campaign) => {
    return (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <Button
          icon="pi pi-eye"
          rounded
          outlined
          severity="info"
          onClick={() => navigate(`/campaign/${campaign.id}`)}
          tooltip="Ver detalle"
          tooltipOptions={{ position: 'top' }}
        />
      </div>
    );
  };

  return (
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
  );
};