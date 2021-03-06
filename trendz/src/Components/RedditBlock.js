import React, { useEffect, useState } from 'react';
import './Component.css'
import Divider from '@material-ui/core/Divider';
import statusUpdate from './componentFunctions/statusUpdate.js';

const nsfwImage = "https://www.cbronline.com/wp-content/uploads/2016/08/UploadsNewsArticle4945779main.jpg"
const defaultImage = "https://static.thenounproject.com/png/49479-200.png"

function RedditBlock(data) {
    const [localTime, setLocalTime] = useState(null);
    useEffect(()=> {
        setLocalTime(new Date(parseInt(data.data.created_at)*1000).toString().substring(0,10));
    }, [])
    const renderImage = () => {
        if (data.data.thumbnail==="nsfw") {
            return (<img src={nsfwImage} alt="" align="left" className="circlePhoto"/>)
        }
        else if(data.data.thumbnail==="default" || data.data.thumbnail==="self")
        {
            return (<img src={defaultImage} alt="" align="left" className="circlePhoto"/>)
        }
        else {
            return(<img src={data.data.thumbnail} alt="" align="left" className="circlePhoto"/>)
        }
    }
    

    return (
        <div className="Block" >
            <a href={"https://"+ String(data.data.link)} target='_blank'>

            {renderImage()}

            <span className="mediaType reddit">Reddit</span>
            <span className="trend">
                <span className="trendingNum">{statusUpdate.update(data.data.status)} {data.data.position} Trend Score:{" " +Math.round(data.data.trendScore * 1000 + 5000)}</span>
            </span>
            <span className="blockTitle">{data.data.subreddit} <span className="Handle">@{data.data.author}</span>  <span className="Handle"> · {localTime}</span></span>
            <span className="description">{data.data.title}</span>
            <Divider variant="middle" style={{marginBottom: '15px'}} />
            </a>
        </div>
    )
}

export default RedditBlock
