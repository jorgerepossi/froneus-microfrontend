// src/features/dashboard/components/ContactsTable.tsx
import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

// @/Types
import { Contact } from '@/shared/types';
 

interface ContactsTableProps {
  contacts: Contact[];
 
}

 const ContactsTable = ({ contacts }: ContactsTableProps) => {
  

  return (
    <DataTable
      value={contacts}
      stripedRows
      paginator
      rows={10}
      emptyMessage="No hay contactos en esta campaña"
    >
      <Column field="firstName" header="Nombre" sortable />
      <Column field="lastName" header="Apellido" sortable />
      <Column field="phone" header="Teléfono" sortable />
      <Column field="email" header="Email" sortable />
      
    </DataTable>
  );
};

export {
    ContactsTable
}