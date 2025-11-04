import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
// @/Types
import { ContactFormData } from '@/shared/types';
 

interface ContactDialogProps {
  visible: boolean;
  formData: ContactFormData;
  onHide: () => void;
  onChange: (field: keyof ContactFormData, value: string) => void;
  onSubmit: () => void;
}

export const ContactDialog: React.FC<ContactDialogProps> = ({
  visible,
  formData,
  onHide,
  onChange,
  onSubmit
}) => {
  return (
    <Dialog
      header="Agregar Nuevo Contacto"
      visible={visible}
      style={{ width: '450px' }}
      onHide={onHide}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="firstName" style={{ display: 'block', marginBottom: '5px' }}>
            Nombre *
          </label>
          <InputText
            id="firstName"
            value={formData.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label htmlFor="lastName" style={{ display: 'block', marginBottom: '5px' }}>
            Apellido *
          </label>
          <InputText
            id="lastName"
            value={formData.lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label htmlFor="phone" style={{ display: 'block', marginBottom: '5px' }}>
            Teléfono *
          </label>
          <InputText
            id="phone"
            value={formData.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            style={{ width: '100%' }}
            placeholder="+54..."
          />
        </div>

        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
            Email
          </label>
          <InputText
            id="email"
            value={formData.email || ''}
            onChange={(e) => onChange('email', e.target.value)}
            style={{ width: '100%' }}
            type="email"
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
          <Button
            label="Cancelar"
            icon="pi pi-times"
            onClick={onHide}
            severity="secondary"
          />
          <Button
            label="Agregar"
            icon="pi pi-check"
            onClick={onSubmit}
          />
        </div>
      </div>
    </Dialog>
  );
};