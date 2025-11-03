import React from 'react';
import { Campaign } from '../../../shared/types';


interface RecentTableProps {
    campaigns: Campaign[];
}

const RecentTable = ({ campaigns }: RecentTableProps) => {
    return (
        <section>
            <h2>Campañas Recientes</h2>
            <table border={1} style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Estado</th>
                        <th>Inicio</th>
                        <th>Contactos</th>
                        <th>Grabar</th>
                    </tr>
                </thead>
                <tbody>
                    {campaigns.length === 0 ? (
                        <tr>
                            <td colSpan={5} style={{ textAlign: 'center' }}>
                                No hay campañas
                            </td>
                        </tr>
                    ) : (
                        campaigns.slice(0, 5).map(campaign => (
                            <tr key={campaign.id}>
                                <td>{campaign.name}</td>
                                <td>{campaign.status}</td>
                                <td>{new Date(campaign.startDateTime).toLocaleString('es-AR')}</td>
                                <td>{campaign.contacts.length}</td>
                                <td>{campaign.recordCall ? 'Sí' : 'No'}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </section>
    )
}
export {
    RecentTable
}