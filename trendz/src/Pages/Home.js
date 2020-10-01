import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tweet from '../Components/Tweet';
import Header from '../Components/Header';
import RedditBlock from '../Components/RedditBlock';
import MovieBlock from '../Components/MovieBlock';
import TvBlock from '../Components/TvBlock';
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


    const [headerOpen, setHeaderOpen] = useState(false);
    
    
    // footerOpen false means the footer is closes, footerOpen
    // true means the footer is open 
    const [footerOpen, setFooterOpen] = useState(false);


    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    
    const dispatch = useDispatch();
    const filterObject = useSelector(state => state.appReducers)
    const getData = async (link="https://metatrends.live/api/getRecentTrendingData") => {
        setLoading(true)
        let response;
        try {
            response = await axios.get(link);

            console.log(response)
            setData([...data, response.data]);
            
        } catch(err) {
            console.log(err)
        }
        setLoading(false)
    }

    useEffect(() => {
        console.log(filterObject.searchData)
    }, [filterObject])

    useEffect(() => {
        let mydate = new Date(filterObject.date);
        console.log(filterObject.date)
        getData(`https://metatrends.live/api/getRecentTrendingData?targetDate=${mydate}`);
        // getData();
        console.log(data)
        // onload
        // displayData();
    }, [filterObject.date])

    const [showFilter, setShowFilter] = useState(false);

    const displayData = (filter) => {
        console.log(data)
        let ls = data.length - 1
        
        let elements = []
        if (data.length!==0) {
            elements.push(<Header time={data[ls].time}/>)
            // headerOpen={headerOpen} setHeaderOpen={setHeaderOpen} footerOpen={footerOpen} setFooterOpen={setFooterOpen}
            for (let i = 0; i <data[ls].data.length; i++) {
                if (data[ls].data[i].type === 'tweet' && filterObject['TWEET']) {
                    data[ls].data[i].position = i
                    elements.push(<Tweet data={data[ls].data[i]} />)
                }
                else if (data[ls].data[i].type === 'reddit' && filterObject['REDDIT']) {
                    data[ls].data[i].position = i
                    elements.push(<RedditBlock data={data[ls].data[i]} />)
                }
                else if (data[ls].data[i].type === 'movie' && filterObject['MOVIE']) {
                    data[ls].data[i].position = i
                    elements.push(<MovieBlock data={data[ls].data[i]}/>)
                }
                else if (data[ls].data[i].type === 'tv' && filterObject['TV']) {
                    data[ls].data[i].position = i
                    elements.push(<TvBlock data={data[ls].data[i]} />)
                }
                else if (data[ls].data[i].type === 'spotify' && filterObject['SPOTIFY']) {
                    data[ls].data[i].position = i
                    elements.push(<SongBlock data={data[ls].data[i]} />)
                }
                else if (data[ls].data[i].type === 'youtube' && filterObject['YOUTUBE']) {
                    data[ls].data[i].position = i
                    elements.push(<YoutubeBlock data={data[ls].data[i]} />)
                }
                else if (data[ls].data[i].type === 'twitch' && filterObject['TWITCH']) {
                    data[ls].data[i].position = i
                    elements.push(<TwitchBlock data={data[ls].data[i]} />)
                }
            }
            elements.push(<Footer footerOpen={footerOpen} setFooterOpen={setFooterOpen}/>)
        }
        return elements
    }



    return (
        <div >
            
            <div id="spacer" className={classes.spacer}></div>
            {loading ? <WaveLoading/>: null}
            
            
            {displayData().map(item =>(item))}

        </div>
    )
}

export default Home
