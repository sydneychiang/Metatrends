import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tweet from '../Components/Tweet';
import Header from '../Components/Header';
import RedditBlock from '../Components/RedditBlock';
import MovieBlock from '../Components/MovieBlock';
import TvBlock from '../Components/TvBlock';
import VideoGameBlock from '../Components/VideoGameBlock';
import SongBlock from '../Components/SongBlock';
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

    const displayData = () => {
        // console.log(data)
        let elements = []
        if (data.length!==0) {
            for (let i = 0; i <data[0].data.length; i++) {
                if (data[0].data[i].type === 'tweet') {
                    elements.push(<Tweet data={data[0].data[i]} />)
                }
                if (data[0].data[i].type === 'reddit') {
                    elements.push(<RedditBlock data={data[0].data[i]} />)
                }
                if (data[0].data[i].type === 'movie') {
                    elements.push(<MovieBlock data={data[0].data[i]}/>)
                }
                if (data[0].data[i].type === 'tv') {
                    console.log('hello')
                    elements.push(<TvBlock data={data[0].data[i]} />)
                }
            }
        }
        return elements
    }



    return (
        <div className={classes.back}>
            <Header style={{display:"flex", alignItems:"center", width:"100%"}} />
            {displayData().map(item =>(item))}
            {/* {data.length!=0 ? <Tweet data={data}/>: null} */}
            {/* <RedditBlock /> */}
            {/* <MovieBlock />
            <TvBlock /> */}
            <VideoGameBlock />
            <SongBlock />
            {/* <button onClick={(event => {window.location.href = "https:/google.com"})}> test</button> */}
        </div>
    )
}

export default Home
