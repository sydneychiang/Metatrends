import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tweet from '../Components/Tweet';
import Header from '../Components/Header';
import RedditBlock from '../Components/RedditBlock';
import MovieBlock from '../Components/MovieBlock';
import TvBlock from '../Components/TvBlock';
import VideoGameBlock from '../Components/VideoGameBlock';
import SongBlock from '../Components/SongBlock';
import YoutubeBlock from '../Components/YoutubeBlock';
import TwitchBlock from '../Components/TwitchBlock';
import Filter from '../Components/Filter';

import './Home.css';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({

}));

function Home() {
    const classes = useStyles();

    const [data, setData] = useState([])

    const getData = async () => {
        const response = await axios.get("https://habitual.live:9000/getRecentTrendingData");
        setData(data.concat(response.data))
    }

    useEffect(() => {
        getData();
        // displayData();
    }, [])

    const filter = ['TV', 'Reddit', 'Song', 'Tweet', 'Movie', 'YouTube'];

    const displayData = (filter) => {
        console.log(data)
        let elements = []
        if (data.length!==0) {
            for (let i = 0; i <data[0].data.length; i++) {
                if (data[0].data[i].type === 'tweet') {
                    data[0].data[i].position = i
                    elements.push(<Tweet data={data[0].data[i]} />)
                }
                else if (data[0].data[i].type === 'reddit') {
                    data[0].data[i].position = i
                    elements.push(<RedditBlock data={data[0].data[i]} />)
                }
                else if (data[0].data[i].type === 'movie') {
                    data[0].data[i].position = i
                    elements.push(<MovieBlock data={data[0].data[i]}/>)
                }
                else if (data[0].data[i].type === 'tv') {
                    data[0].data[i].position = i
                    elements.push(<TvBlock data={data[0].data[i]} />)
                }
                else if (data[0].data[i].type === 'spotify') {
                    console.log('spotify')
                    data[0].data[i].position = i
                    elements.push(<SongBlock data={data[0].data[i]} />)
                }
                else if (data[0].data[i].type === 'youtube') {
                    console.log('youtube')
                    data[0].data[i].position = i
                    elements.push(<YoutubeBlock data={data[0].data[i]} />)
                }
                else if (data[0].data[i].type === 'twitch') {
                    console.log('twitch')
                    data[0].data[i].position = i
                    elements.push(<TwitchBlock data={data[0].data[i]} />)
                }
            }
        }
        return elements
    }



    return (
        <div className={classes.back}>
            <Header style={{display:"flex", alignItems:"center"}} />
            {/* <Filter /> */}
            {displayData().map(item =>(item))}
            {/* <VideoGameBlock /> */}
        </div>
    )
}

export default Home
