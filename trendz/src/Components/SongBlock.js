import React from 'react'
import './Component.css'
import wap from './wap.jpg'
import Divider from '@material-ui/core/Divider';


function SongBlock() {
    return (
        <div className="Block">
            <img src={wap} alt="" align="left" className="circlePhoto"/> 

            <span className="mediaType song">Song</span>
            <span className="trendingNum">#2 Trending</span>
            
            <span className="blockTitle">WAP</span>
            <span className="description">Cardi B ft. Megan Thee Stallion</span>

            <Divider variant="middle" style={{marginBottom: '15px'}} />
        </div>
    )
}

export default SongBlock