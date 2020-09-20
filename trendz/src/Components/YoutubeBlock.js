import React, { useEffect, useState } from 'react';
import './Component.css'
import Divider from '@material-ui/core/Divider';
import statusUpdate from './componentFunctions/statusUpdate.js';

function YoutubeBlock(data) {
    const [localTime, setLocalTime] = useState(null);
    useEffect(()=> {
        setLocalTime(new Date(data.data.publishedAt).toString().substring(0,10));

    }, [])
    return (
            <div className="Block">
                <a href={data.data.link} target='_blank'>
                    <div className='youtubeImageFormat'>
                        <img src={data.data.thumbnails.high.url} alt="" align="left" className="youtubeImage"/> 
                    </div>
                    <span className="mediaType videoGame">Youtube</span>
                    <span className="trendingNum">{statusUpdate.update(data.data.status)} #{data.data.position+1} Trend Score:{" " +Math.round((data.data.trendScore * 1000)+5000)}</span>
                    
                    <span className="blockTitle">{data.data.channelTitle}<span className="Handle"> {localTime}</span></span>
                    <span className="description">{data.data.title}</span>
                </a>
                
                <Divider variant="middle" style={{marginBottom: '15px'}} />
            </div>


    )
}

export default YoutubeBlock