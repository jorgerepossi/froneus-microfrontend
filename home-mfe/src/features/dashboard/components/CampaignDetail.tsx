import React, { useState } from "react"
import { useParams, useNavigate } from 'react-router-dom';



const CampaignDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    return (
        <div>
            <h1>Detail</h1>
        </div>
    )
}

export default CampaignDetail;