import React, { useEffect, useState } from 'react';
import Divider from '@material-ui/core/Divider';
import './Component.css'
import statusUpdate from './componentFunctions/statusUpdate.js';

function fixImage(imageLink)
{
   let extension = imageLink.split('.').pop();
   if(imageLink.indexOf('normal')!=-1)
   {
    imageLink = imageLink.substring(0, imageLink.indexOf("normal"))+"400x400."
    imageLink += extension
    return imageLink
   }
   return imageLink
   
}

function Tweet( data ) {
    const [localTime, setLocalTime] = useState(null);
    useEffect(()=> {
        setLocalTime(new Date(data.data.created_at).toString().substring(0,10));

    }, [])
 
    return (
        <div className="Block" >
        <a href={data.data.link} target='_blank'>

            <img src={fixImage(data.data.profile_image)} alt="Twitter" align="left" className="circlePhoto"/> 

            <span className="mediaType twitterPost">Twitter</span>
            <span className="trend">
                <span className="trendingNum">{statusUpdate.update(data.data.status)} {data.data.position} Trend Score:{" " +Math.round(data.data.trendScore * 1000 + 5000)}</span>
                <span className="trendScoreExplanation">The Trend Score is calculated while taking into account the levels of activity common to each platform.</span>
            </span>
            <span className="blockTitle">{data.data.user_name}  <span className="Handle">@{data.data.screen_name} · {localTime}{/*Date(data.data.created_at).getFullYear() + '-' + (data.data.created_at.getMonth() + 1) + '-' + data.data.created_at.getDate()*/}</span></span>
            
            
            <span className="description">{data.data.text}</span>
            {/* <a className="hashtag" href="https://twitter.com/hashtag/tellmeaboutyou?src=hash" target='_blank'>#Hashtag</a> */}
            <Divider variant="middle" style={{marginBottom: '15px'}} />
         </a>
        </div>
    )
}

export default Tweet
