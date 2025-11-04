// src/features/dashboard/components/DeleteCampaignDialog.tsx
import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Campaign } from '@/shared/types';
 

interface DeleteCampaignDialogProps {
  visible: boolean;
  campaign: Campaign | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteCampaignDialog: React.FC<DeleteCampaignDialogProps> = ({
  visible,
  campaign,
  onConfirm,
  onCancel
}) => {
  return (
    <Dialog
      header="Confirmar eliminación"
      visible={visible}
      style={{ width: '450px' }}
      onHide={onCancel}
      footer={
        <div>
          <Button
            label="Cancelar"
            icon="pi pi-times"
            onClick={onCancel}
            severity="secondary"
          />
          <Button
            label="Eliminar"
            icon="pi pi-trash"
            onClick={onConfirm}
            severity="danger"
          />
        </div>
      }
    >
      <p>
        ¿Estás seguro de que deseas eliminar la campaña <strong>{campaign?.name}</strong>?
      </p>
      <p>Esta acción no se puede deshacer.</p>
    </Dialog>
  );
};