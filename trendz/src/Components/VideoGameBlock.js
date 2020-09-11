import React from 'react'
import './Component.css'
import fallGuys from './fallGuys.jpg'
import Divider from '@material-ui/core/Divider';

function VideoGameBlock() {
    return (
            <div className="Block">

                <img src={fallGuys} alt="" align="left" className="posterPhoto"/> 

                <span className="mediaType videoGame">Video Game</span>
                <span className="trendingNum">#3 Trending</span>
                
                <span className="blockTitle">Fall Guys</span>
                <span className="description">Ultimate Knockout flings hordes of contestants together online in a mad dash through round after round of escalating chaos until one victor remains!</span>
                <Divider variant="middle" style={{marginBottom: '15px'}} />
            </div>
    )
}

export default VideoGameBlock