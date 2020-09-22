import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tweet from '../Components/Tweet';
import Header from '../Components/Header';
import RedditBlock from '../Components/RedditBlock';
import MovieBlock from '../Components/MovieBlock';
import TvBlock from '../Components/TvBlock';
// import VideoGameBlock from '../Components/VideoGameBlock';
import SongBlock from '../Components/SongBlock';
import YoutubeBlock from '../Components/YoutubeBlock';
import TwitchBlock from '../Components/TwitchBlock';
import Filter from '../Components/Filter';
import { WaveLoading } from 'react-loadingg';
import './Home.css';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    spacer: {
        height:"160px",
        marginBottom:"20px",
    }

}));

function Home() {
    const classes = useStyles();

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState();

    const getData = async (link="https://habitual.live:9000/getRecentTrendingData") => {
        setLoading(true)
        let response;
        try {
            response = await axios.get(link);
            setData(data.concat(response.data))

        } catch(err) {
            console.log(err)
        }
        setLoading(false)
    }

    useEffect(() => {
        let mydate = new Date();
        getData(`https://habitual.live:9000/getRecentTrendingDataByDate?targetDate=${mydate}`);
        // getData();

        // onload
        // displayData();
    }, [date])

    const [showFilter, setShowFilter] = useState(false);

    const displayData = (filter) => {
        // console.log(data)
        let elements = []
        if (data.length!==0) {
            elements.push(<Header time={data[0].time}/>)
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
                    data[0].data[i].position = i
                    elements.push(<SongBlock data={data[0].data[i]} />)
                }
                else if (data[0].data[i].type === 'youtube') {
                    data[0].data[i].position = i
                    elements.push(<YoutubeBlock data={data[0].data[i]} />)
                }
                else if (data[0].data[i].type === 'twitch') {
                    data[0].data[i].position = i
                    elements.push(<TwitchBlock data={data[0].data[i]} />)
                }
            }
            
        }
        return elements
    }



    return (
        <div >
            <div id="spacer" className={classes.spacer}></div>
            {/* <button onClick={event => {setDate("2020-09-20")}}>change to yesterday</button> */}
            {loading ? <WaveLoading/>: null}
            {/* <Header time={time}/> */}
            {/* <button className="filterButton" onClick={event => {setShowFilter(!showFilter)}}>Sort <span className="leftAlign">{'\u25bc'}</span></button>
            {showFilter?<Filter /> : null} */}
            {displayData().map(item =>(item))}
        </div>
    )
}

export default Home
