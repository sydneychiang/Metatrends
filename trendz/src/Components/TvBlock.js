import React, { useEffect, useState } from 'react';
import './Component.css'
import Divider from '@material-ui/core/Divider';
import statusUpdate from './componentFunctions/statusUpdate.js';

function TvBlock(data) {
   
    return (
        
        <div className="Block"> 
            <a href={data.data.link} target='_blank'>
            <img src={data.data.image} alt="" align="left" className="posterPhoto"/> 

            <span className="mediaType tv">Television</span>
            <span className="trend">
                <span className="trendingNum">{statusUpdate.update(data.data.status)} {data.data.position} Trend Score:{" " +Math.round(data.data.trendScore * 1000 + 5000)}</span>
                <span className="trendScoreExplanation">The Trend Score is calculated while taking into account the levels of activity common to each platform.</span>
            </span>
            <span className="blockTitle">{data.data.original_title}<span className="Handle"> {data.data.first_air_date.substring(0,4)}</span></span>
            <span className="description">{data.data.overview}</span>
        
            <Divider variant="middle" style={{marginBottom: '15px'}} />
            </a>
        </div>
    )
}

export default TvBlock