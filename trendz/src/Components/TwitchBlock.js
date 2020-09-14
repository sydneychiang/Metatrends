import React, { useEffect, useState } from 'react';
import './Component.css'
import Divider from '@material-ui/core/Divider';


function TwitchBlock(data) {
    useEffect(() => {
        console.log("hello")
        console.log("hello")
        console.log("hello")
        console.log("hello")
        console.log("hello")
        console.log("hello")
        console.log("hello")
        console.log("hello")
        console.log("hello")
        console.log("hello")
        console.log("hello")
        console.log("hello")
        console.log("hello")
        console.log("hello")
        console.log("twitch data", data.data)
    }, [])
    return (

        <div className="Block">
            <a href={("https://twitch.tv/"+data.data.user_name)} target='_blank'>
                <div className='youtubeImageFormat'>
                    <img src={data.data.thumbnail} alt="" align="left" className="youtubeImage"/> 
                </div>
                <span className="mediaType twitch">Twitch</span>
                <span className="trendingNum">#{data.data.position+1} Trending</span>
                
                <span className="blockTitle twitchTitle">{data.data.user_name + " is streaming "+data.data.game}</span>
                {/* <span className="description">{data.data.title}</span> */}
            </a>
            <Divider variant="middle" style={{marginBottom: '15px'}} />
            
        </div>


    )
}

export default TwitchBlock