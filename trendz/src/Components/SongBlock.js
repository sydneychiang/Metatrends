import React, { useEffect, useState } from 'react';
import './Component.css'
import Divider from '@material-ui/core/Divider';


function SongBlock(data) {
    const [loadedName, setLoadedName] = useState(null)
    const [loadedArtists, setLoadedArtists] = useState([])
    const [loadedImages, setLoadedImages] = useState(null)

    useEffect(() => {
        console.log(data)
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
                <span className="trendingNum">#{data.data.position+1}  Trending</span>

                <span className="blockTitle">{loadedName}</span>
                <span className="description">{loadedArtists.map(inner => inner).join(', ')}</span>

                <Divider variant="middle" style={{ marginBottom: '15px' }} />
        </a>

            </div>
        // <div class="Block" onClick={(event => {window.open(data.data.link, '_blank')})}>
        //     <img src={loadedImages} alt="" align="left" className="circlePhoto"/> 

        //     <span className="mediaType song">Song</span>
        //     <span className="trendingNum">#2 Trending</span>

        //     <span className="blockTitle">{loadedName}</span>
        //     <span className="description">{loadedArtists.map(inner=>inner).join(', ') }</span>

        //     <Divider variant="middle" style={{marginBottom: '15px'}} />
        // </div>
    )
}

export default SongBlock