import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Campaign, CampaignStatus } from '@/shared/types';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';

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

export const CampaignActions = ({
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
}: CampaignActionsProps) => {
  const menuRef = useRef<Menu>(null);

 
  const menuItems: MenuItem[] = [
    {
      label: 'Ver detalle',
      icon: 'pi pi-eye',
      command: () => onViewDetail(campaign.id)
    },
    {
      label: 'Gestionar contactos',
      icon: 'pi pi-users',
      command: () => onEdit(campaign.id)
    }
  ];


  if (canActivate || canPause || canResume || canFinish || canDelete) {
    menuItems.push({ separator: true });
  }


  if (canActivate) {
    menuItems.push({
      label: 'Activar',
      icon: 'pi pi-play',
      command: () => onActivate(campaign)
    });
  }

  if (campaign.status ===  CampaignStatus.ACTIVE) {
    menuItems.push({
      label: 'Pausar',
      icon: 'pi pi-pause',
      command: () => onPause(campaign)
    });
  }

 

  if (canFinish) {
    menuItems.push({
      label: 'Finalizar',
      icon: 'pi pi-stop',
      command: () => onFinish(campaign)
    });
  }

  if (canDelete) {
    menuItems.push({ separator: true });
    menuItems.push({
      label: 'Eliminar',
      icon: 'pi pi-trash',
      className: 'text-red-500',
      command: () => onDelete(campaign)
    });
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Menu model={menuItems} popup ref={menuRef} />
      <Button
        icon="pi pi-ellipsis-v"
        rounded
        outlined
        severity="secondary"
        onClick={(e) => menuRef.current?.toggle(e)}
        tooltip="Acciones"
        tooltipOptions={{ position: 'left' }}
      />
    </div>
  );
};