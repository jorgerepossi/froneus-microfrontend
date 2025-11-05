import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { useCampaignForm } from '../hooks/useCampaignForm';
import { Calendar } from 'primereact/calendar';
import { BreadCrumb } from 'primereact/breadcrumb';

export const CampaignForm = () => {
    const { formData, isEditMode, handleChange, handleSubmit, handleCancel } = useCampaignForm();

    const items = [
        { label: 'Dashboard', url: '/' },
        { label: 'Campañas', url: '/campaigns' },
        { label: isEditMode ? 'Editar Campaña' : 'Nueva Campaña' }
    ];

    const home = { 
        icon: 'pi pi-home', 
        url: '/' 
    };

    return (
        <div style={{ padding: '20px' }}>
             <BreadCrumb model={items} home={home} />
            <Card title={isEditMode ? 'Editar Campaña' : 'Crear Nueva Campaña'}>
 
                <label htmlFor="name" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                    Nombre de la Campaña *
                </label>
                <InputText
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Ej: Campaña de Verano 2025"
                    style={{ width: '100%' }}
                    disabled={isEditMode}
                />
                {isEditMode && (
                    <small style={{ color: '#6c757d', display: 'block', marginTop: '4px' }}>
                        El nombre no puede modificarse en modo edición
                    </small>
                )}


                <div>
                    <label htmlFor="startDateTime" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                        Fecha y Hora de Inicio *
                    </label>
                    <Calendar
                        id="startDateTime"
                        value={formData.startDateTime}
                        onChange={(e) => handleChange('startDateTime', e.value)}
                        showTime
                        hourFormat="24"
                        dateFormat="dd/mm/yy"
                        placeholder="Seleccione fecha y hora"
                        style={{ width: '100%' }}
                        disabled={isEditMode}
                    />
                    {isEditMode && (
                        <small style={{ color: '#6c757d', display: 'block', marginTop: '4px' }}>
                            La fecha no puede modificarse en modo edición
                        </small>
                    )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Checkbox
                        inputId="recordCall"
                        checked={formData.recordCall}
                        onChange={(e) => handleChange('recordCall', e.checked)}
                        disabled={isEditMode}
                    />
                    <label htmlFor="recordCall" style={{ fontWeight: 'bold', cursor: 'pointer' }}>
                        Grabar llamadas
                    </label>
                    {isEditMode && (
                        <small style={{ color: '#6c757d', marginLeft: '10px' }}>
                            (No modificable)
                        </small>
                    )}
                </div>


                {isEditMode && (
                    <div style={{
                        padding: '12px',
                        backgroundColor: '#fff3cd',
                        border: '1px solid #ffc107',
                        borderRadius: '4px',
                        color: '#856404'
                    }}>
                        <strong>Nota:</strong> En modo edición solo puedes agregar contactos.
                        Los datos de la campaña no pueden modificarse.
                    </div>
                )}


                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                    <Button
                        label="Cancelar"
                        icon="pi pi-times"
                        onClick={handleCancel}
                        severity="secondary"
                    />
                    <Button
                        label={isEditMode ? 'Actualizar' : 'Crear Campaña'}
                        icon="pi pi-check"
                        onClick={handleSubmit}
                    />
                </div>

            </Card>
        </div>

    )
}