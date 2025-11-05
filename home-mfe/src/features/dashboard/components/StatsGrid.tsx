import React from "react"
import { StatsGridProps } from "../types"
import { Card } from "primereact/card"



const StatsGrid = ({
    totalCampaigns,
    totalContacts,
    waitingCampaigns,
    activeCampaigns,
    finishedCampaigns,
    waitingContacts,
    activeContacts,
    finishedContacts

}: StatsGridProps) => {
    return (
        <div className='dashboard_wrapper--stats'>
            <Card className="box" title="Generales">
                 
                <div>
                    <p> Total de campañas {totalCampaigns}</p>
                    <p>Total de Contactos: <strong>{totalContacts}</strong></p>
                </div>
            </Card>

            <Card className="box" title="Campañas por Estado">
                
                <div>
                    <p>En Espera: <strong>{waitingCampaigns}</strong></p>
                    <p>Activas: <strong>{activeCampaigns}</strong></p>
                    <p>Finalizadas: <strong>{finishedCampaigns}</strong></p>
                </div>
            </Card>

            <Card className="box" title="Contactos por Estado de Campaña">
                 
                <div>
                    <p>En Espera: <strong>{waitingContacts}</strong> contactos</p>
                    <p>Activas: <strong>{activeContacts}</strong> contactos</p>
                    <p>Finalizadas: <strong>{finishedContacts}</strong> contactos</p>
                </div>
            </Card>
        </div>
    )
}

export {
    StatsGrid
}


