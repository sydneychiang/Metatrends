import React, { useEffect, useState } from 'react';
import './Component.css'
import theBoys from './theBoys.jpeg'
import Divider from '@material-ui/core/Divider';

function TvBlock(data) {
    useEffect(()=>{
        console.log("TV: ", data)
    }, [])
    return (
        <div className="Block">
            <img src={data.data.image} alt="" align="left" className="posterPhoto"/> 

            <span className="mediaType tv">Television</span>
            <span className="trendingNum">#5 Trending</span>
            
            <span className="blockTitle">{data.data.original_title}</span>
            <span className="description">{data.data.overview}</span>
        
            <Divider variant="middle" style={{marginBottom: '15px'}} />
        </div>
    )
}

export default TvBlock