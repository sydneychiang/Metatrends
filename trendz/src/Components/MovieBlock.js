import React, { useEffect, useState } from 'react';
import './Component.css'
import Divider from '@material-ui/core/Divider';

function MovieBlock(data) {
    useEffect(()=>{
        console.log(data.data)
    }, [])
    return (
        <div className="Block" >
            <a href={data.data.link} target='_blank'>

            <div >
                <img src={data.data.image} alt="Mulan Poster" className="posterPhoto" align="left"/>

                <span className="mediaType movie">Movie</span>
                <span className="trendingNum">#{data.data.position+1}  Trend Score:{" " +Math.round(data.data.trendScore * 1000)}</span>

                <span className="blockTitle">{data.data.original_title}</span>
                <span className="description">{data.data.overview}</span>
            </div>
            <Divider variant="middle" style={{marginBottom: '15px'}} />
            </a>
        </div>
    )
}

export default MovieBlock
