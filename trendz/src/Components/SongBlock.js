import React, { useEffect, useState } from 'react';
import './Component.css'
import Divider from '@material-ui/core/Divider';
import statusUpdate from './componentFunctions/statusUpdate.js';


function SongBlock(data) {
    const [loadedName, setLoadedName] = useState(null)
    const [loadedArtists, setLoadedArtists] = useState([])
    const [loadedImages, setLoadedImages] = useState(null)

    useEffect(() => {
        if (data.data) {
            setLoadedName(data.data.name)
        }
        if (data.data.images[0]) {
            setLoadedImages(data.data.images[0].url)
        }
        if (data.data.artists[0]) {
            let temp = []
            data.data.artists.map(item => { temp.push(item.name) })
            setLoadedArtists(temp)
        }

    }, [data])


    return (
        <div className="Block">
        <a href={data.data.link} target='_blank'>

                <img src={loadedImages} alt="" align="left" className="circlePhoto" />

                <span className="mediaType song">Song</span>
                <span className="trend">
                    <span className="trendingNum">{statusUpdate.update(data.data.status)} {data.data.position} Trend Score:{" " +Math.round(data.data.trendScore * 1000 + 5000)}</span>
                    <span className="trendScoreExplanation">The Trend Score is calculated while taking into account the levels of activity common to each platform.</span>
                </span>
                <span className="blockTitle">{loadedName}</span>
                <span className="description">{loadedArtists.map(inner => inner).join(', ')}</span>

                <Divider variant="middle" style={{ marginBottom: '15px' }} />
        </a>

            </div>
    )
}

export default SongBlock