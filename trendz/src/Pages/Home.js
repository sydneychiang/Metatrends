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
import { useSelector, useDispatch } from 'react-redux';
// import Calendar from '../Components/Calendar';
import Footer from '../Components/Footer'



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
    
    const dispatch = useDispatch();
    const filterObject = useSelector(state => state.appReducers)
    const getData = async (link="https://metatrends.live/api/getRecentTrendingData") => {
        setLoading(true)
        let response;
        try {
            response = await axios.get(link);
            console.log('HELLOOOOOOOO', response)
            setData(data.concat(response.data))
        } catch(err) {
            console.log(err)
        }
        setLoading(false)
    }

    useEffect(() => {
        console.log(filterObject);
    }, [])

    useEffect(() => {
        let mydate = new Date();
        console.log(filterObject.date)
        getData(`https://metatrends.live/api/getRecentTrendingDataByDate?targetDate=${mydate}`);
        // getData();

        // onload
        // displayData();
    }, [filterObject.date])

    const [showFilter, setShowFilter] = useState(false);

    const displayData = (filter) => {
        // console.log(data)
        let elements = []
        if (data.length!==0) {
            elements.push(<Header time={data[0].time}/>)
            for (let i = 0; i <data[0].data.length; i++) {
                if (data[0].data[i].type === 'tweet' && filterObject['TWEET']) {
                    data[0].data[i].position = i
                    elements.push(<Tweet data={data[0].data[i]} />)
                }
                else if (data[0].data[i].type === 'reddit' && filterObject['REDDIT']) {
                    data[0].data[i].position = i
                    elements.push(<RedditBlock data={data[0].data[i]} />)
                }
                else if (data[0].data[i].type === 'movie' && filterObject['MOVIE']) {
                    data[0].data[i].position = i
                    elements.push(<MovieBlock data={data[0].data[i]}/>)
                }
                else if (data[0].data[i].type === 'tv' && filterObject['TV']) {
                    data[0].data[i].position = i
                    elements.push(<TvBlock data={data[0].data[i]} />)
                }
                else if (data[0].data[i].type === 'spotify' && filterObject['SPOTIFY']) {
                    data[0].data[i].position = i
                    elements.push(<SongBlock data={data[0].data[i]} />)
                }
                else if (data[0].data[i].type === 'youtube' && filterObject['YOUTUBE']) {
                    data[0].data[i].position = i
                    elements.push(<YoutubeBlock data={data[0].data[i]} />)
                }
                else if (data[0].data[i].type === 'twitch' && filterObject['TWITCH']) {
                    data[0].data[i].position = i
                    elements.push(<TwitchBlock data={data[0].data[i]} />)
                }
            }
            elements.push(<Footer />)
        }
        return elements
    }



    return (
        <div >
            
            <div id="spacer" className={classes.spacer}></div>
            {/* <button onClick={event=>{console.log(filterObject.date)}}>click here :)</button> */}

            {/* <button onClick={event => {setDate("2020-09-20")}}>change to yesterday</button> */}
            {loading ? <WaveLoading/>: null}
            
            
            {displayData().map(item =>(item))}

        </div>
    )
}

export default Home
