import React, { useEffect, useState } from 'react';
import './Component.css'
import Divider from '@material-ui/core/Divider';

function TvBlock(data) {
    useEffect(()=>{
        // console.log("TV: ", data)
    }, [])
    return (
        
        <div className="Block"> 
            <a href={data.data.link} target='_blank'>
            <img src={data.data.image} alt="" align="left" className="posterPhoto"/> 

            <span className="mediaType tv">Television</span>
            <span className="trendingNum">#{data.data.position+1} Trend Score:{" " +Math.round(data.data.trendScore * 1000 + 5000)}</span>
            
            <span className="blockTitle">{data.data.original_title}</span>
            <span className="description">{data.data.overview}</span>
        
            <Divider variant="middle" style={{marginBottom: '15px'}} />
            </a>
        </div>
    )
}

export default TvBlock