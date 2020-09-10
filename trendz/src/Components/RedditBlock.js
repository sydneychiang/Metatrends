import React, { useEffect, useState } from 'react';
import './Component.css'
import liam from './liamNeeson.jpg'
import Divider from '@material-ui/core/Divider';

const nsfwImage = "https://www.cbronline.com/wp-content/uploads/2016/08/UploadsNewsArticle4945779main.jpg"
const defaultImage = "https://static.thenounproject.com/png/49479-200.png"

function RedditBlock(data) {
    useEffect(()=>{
        console.log("REDDIT", data)
    }, [])

    const renderImage = () => {
        if (data.data.thumbnail==="nsfw") {
            return (<img src={nsfwImage} alt="" align="left" className="circlePhoto"/>)
        }
        else if(data.data.thumbnail==="default")
        {
            return (<img src={defaultImage} alt="" align="left" className="circlePhoto"/>)
        }
        else {
            return(<img src={data.data.thumbnail} alt="" align="left" className="circlePhoto"/>)
        }
    }
    

    return (
        <div className="Block">
            {renderImage()}

            <span className="mediaType reddit">Reddit</span>
            <span className="trendingNum">#10 Trending</span>
            
    <span className="blockTitle">{data.data.subreddit} <span className="Handle">@{data.data.author}</span></span>
            <span className="description">{data.data.title}</span>
            <Divider variant="middle" style={{marginBottom: '15px'}} />
        </div>
    )
}

export default RedditBlock
