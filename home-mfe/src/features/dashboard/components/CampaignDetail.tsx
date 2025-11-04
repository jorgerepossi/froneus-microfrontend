import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
 
import { ContactsTable } from './ContactsTable';
import { ContactDialog } from './ContactDialog';
import { CampaignInfo } from './CampaignInfo';
// @/Hooks
import { useContactDialog } from '@/shared/hooks/useContactDialog';
import { useCampaignDetail } from '@/shared/hooks/useCampaignDetail';

const CampaignDetail = () => {
  const { campaign, handleBack  } = useCampaignDetail();  
  const contactDialog = useContactDialog(campaign?.id || '');

  if (!campaign) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Campaña no encontrada</h2>
        <Button label="Volver al Dashboard" onClick={handleBack} />
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
     
      <Button
        label="Volver al Dashboard"
        icon="pi pi-arrow-left"
        onClick={handleBack}
        style={{ marginBottom: '20px' }}
      />

    
      <CampaignInfo campaign={campaign} />
      <Card title="Contactos de la Campaña" style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <Button
            label="Agregar Contacto"
            icon="pi pi-plus"
            onClick={contactDialog.handleOpen}
          />
        </div>

        <ContactsTable 
          contacts={campaign.contacts}
          
        />
      </Card>
      <ContactDialog
        visible={contactDialog.visible}
        formData={contactDialog.formData}
        onHide={contactDialog.handleClose}
        onChange={contactDialog.handleChange}
        onSubmit={contactDialog.handleSubmitFormData}
      />
    </div>
  );
};

export default CampaignDetail;