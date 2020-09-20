import React, { useEffect, useState } from 'react';
import './Component.css'
import Divider from '@material-ui/core/Divider';
import statusUpdate from './componentFunctions/statusUpdate.js';


function TwitchBlock(data) {
    const [localTime, setLocalTime] = useState(null);
    useEffect(()=> {
        setLocalTime(new Date(data.data.started_at).toString().substring(0,10));

    }, [])
    return (

        <div className="Block">
            <a href={("https://twitch.tv/"+data.data.user_name)} target='_blank'>
                <div className='youtubeImageFormat'>
                    <img src={data.data.thumbnail} alt="" align="left" className="youtubeImage"/> 
                </div>
                <span className="mediaType twitch">Twitch</span>
                <span className="trendingNum">{statusUpdate.update(data.data.status)} #{data.data.position+1} Trend Score:{" " +Math.round(data.data.trendScore * 1000 +5000)}</span>
                
                <span className="blockTitle twitchTitle">{data.data.user_name + " is streaming "+data.data.game}  <span className="Handle"> {localTime}</span></span>
                {/* <span className="description">{data.data.title}</span> */}
            </a>
            <Divider variant="middle" style={{marginBottom: '15px'}} />
            
        </div>


    )
}

export default TwitchBlock