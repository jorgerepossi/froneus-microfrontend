import React from "react"
import { StatsGridProps } from "../types"



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
        <div>
            <p> Generales </p>
            <div>
                <p> Total de campañas {totalCampaigns}</p>
                <p>Total de Contactos: <strong>{totalContacts}</strong></p>
            </div>
            <h2>Campañas por Estado</h2>
            <div>
                <p>En Espera: <strong>{waitingCampaigns}</strong></p>
                <p>Activas: <strong>{activeCampaigns}</strong></p>
                <p>Finalizadas: <strong>{finishedCampaigns}</strong></p>
            </div>

            <h2>Contactos por Estado de Campaña</h2>
            <div>
                <p>En Espera: <strong>{waitingContacts}</strong> contactos</p>
                <p>Activas: <strong>{activeContacts}</strong> contactos</p>
                <p>Finalizadas: <strong>{finishedContacts}</strong> contactos</p>
            </div>
        </div>
    )
}

export {
    StatsGrid
}


