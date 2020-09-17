import React, { useEffect, useState } from 'react';
import './Component.css'
import Divider from '@material-ui/core/Divider';

function YoutubeBlock(data) {
   
    return (
            <div className="Block">
                <a href={data.data.link} target='_blank'>
                    <div className='youtubeImageFormat'>
                        <img src={data.data.thumbnails.high.url} alt="" align="left" className="youtubeImage"/> 
                    </div>
                    <span className="mediaType videoGame">Youtube</span>
                    <span className="trendingNum">#{data.data.position+1} Trend Score:{" " +Math.round((data.data.trendScore * 1000)+5000)}</span>
                    
                    <span className="blockTitle">{data.data.channelTitle}</span>
                    <span className="description">{data.data.title}</span>
                </a>
                
                <Divider variant="middle" style={{marginBottom: '15px'}} />
            </div>


    )
}

export default YoutubeBlock