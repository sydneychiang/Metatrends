import React, { useEffect, useState } from 'react';
import Divider from '@material-ui/core/Divider';
import './Component.css'


function Tweet( data ) {
    useEffect(()=>{
        console.log(data)
    }, [])
    return (
        <div className="Block" onClick={(event => {window.open(data.data.link)})}>
            <img src={data.data.profile_image} alt="Twitter" align="left" className="circlePhoto"/> 

            <span className="mediaType twitterPost">Tweet</span>
            <span className="trendingNum">#4 Trending</span>
            
            <span className="blockTitle">{data.data.user_name}  <span className="Handle">@{data.data.screen_name} · {data.data.created_at.substring(0,10)}{/*Date(data.data.created_at).getFullYear() + '-' + (data.data.created_at.getMonth() + 1) + '-' + data.data.created_at.getDate()*/}</span></span>
            
            
            <span className="description">{data.data.text} <a className="hashtag" href="https://twitter.com/hashtag/tellmeaboutyou?src=hash" target='_blank'>#TellMeAboutYou</a></span>
            <Divider variant="middle" style={{marginBottom: '15px', "width": '90%', 'margin': '0 auto'}} />
         
        </div>
    )
}

export default Tweet
