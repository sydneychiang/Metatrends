import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tweet from '../Components/Tweet';
import Header from '../Components/Header';
import * as HeaderFunctions from '../Components/Header';
import RedditBlock from '../Components/RedditBlock';
import MovieBlock from '../Components/MovieBlock';
import TvBlock from '../Components/TvBlock';
import SongBlock from '../Components/SongBlock';
import YoutubeBlock from '../Components/YoutubeBlock';
import TwitchBlock from '../Components/TwitchBlock';
import { WaveLoading } from 'react-loadingg';
import './Home.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../Components/Footer'



const useStyles = makeStyles((theme) => ({
    spacer: {
        height:"160px",
        marginBottom:"20px",
    }

}));

function Home() {
    const classes = useStyles();


    // headerOpen false means the header is closed, headerOpen true
    // means that the header is open
    const [headerOpen, setHeaderOpen] = useState(false);
    
    
    // footerOpen false means the footer is closed, footerOpen
    // true means the footer is open 
    const [footerOpen, setFooterOpen] = useState(false);


    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    
    const dispatch = useDispatch();
    const filterObject = useSelector(state => state.appReducers)
    const getData = async (link="https://metatrends.live/api/getRecentTrendingData") => {
        setLoading(true)
        let response;
        try {
            response = await axios.get(link);

            setData([...data, response.data]);
            
        } catch(err) {
            console.log(err)
        }
        setLoading(false)
    }
    
    useEffect(() => {
        console.log('SEARCH DATA', filterObject.searchData)
    }, [filterObject])

    useEffect(() => {
        let mydate = new Date(filterObject.date);
        getData(`https://metatrends.live/api/getRecentTrendingData?targetDate=${mydate}`);
    }, [filterObject.date])

    const [showFilter, setShowFilter] = useState(false);

    
    const displayData = (data) => {
        let ls = data.length - 1
        
        
        let elements = []
        if (data.length!==0) {
            // HeaderFunctions.updateHeaderString(data[ls].time)

            elements.push(<Header time={data[ls].time} headerOpen={headerOpen} setHeaderOpen={setHeaderOpen} footerOpen={footerOpen} setFooterOpen={setFooterOpen}/>)
            // headerOpen={headerOpen} setHeaderOpen={setHeaderOpen} footerOpen={footerOpen} setFooterOpen={setFooterOpen}
            for (let i = 0; i <data[ls].data.length; i++) {
                if (data[ls].data[i].type === 'tweet' && filterObject['TWEET']) {
                    data[ls].data[i].position = `#${i+1}`
                    elements.push(<Tweet data={data[ls].data[i]} />)
                }
                else if (data[ls].data[i].type === 'reddit' && filterObject['REDDIT']) {
                    data[ls].data[i].position = `#${i+1}`
                    elements.push(<RedditBlock data={data[ls].data[i]} />)
                }
                else if (data[ls].data[i].type === 'movie' && filterObject['MOVIE']) {
                    data[ls].data[i].position = `#${i+1}`
                    elements.push(<MovieBlock data={data[ls].data[i]}/>)
                }
                else if (data[ls].data[i].type === 'tv' && filterObject['TV']) {
                    data[ls].data[i].position = `#${i+1}`
                    elements.push(<TvBlock data={data[ls].data[i]} />)
                }
                else if (data[ls].data[i].type === 'spotify' && filterObject['SPOTIFY']) {
                    data[ls].data[i].position = `#${i+1}`
                    elements.push(<SongBlock data={data[ls].data[i]} />)
                }
                else if (data[ls].data[i].type === 'youtube' && filterObject['YOUTUBE']) {
                    data[ls].data[i].position = `#${i+1}`
                    elements.push(<YoutubeBlock data={data[ls].data[i]} />)
                }
                else if (data[ls].data[i].type === 'twitch' && filterObject['TWITCH']) {
                    data[ls].data[i].position = `#${i+1}`
                    elements.push(<TwitchBlock data={data[ls].data[i]} />)
                }
            }
        } 
        return elements
    }


    const displaySearchData = (data) => {
        let ls = data.length - 1
        
        let elements = []
        if (data.length!==0) {
            elements.push(<Header time={data[ls].time} headerOpen={headerOpen} setHeaderOpen={setHeaderOpen} footerOpen={footerOpen} setFooterOpen={setFooterOpen}/>)
            // headerOpen={headerOpen} setHeaderOpen={setHeaderOpen} footerOpen={footerOpen} setFooterOpen={setFooterOpen}
            if (data[ls].data.length === 0) {
                elements.push(<h1 style={{textAlign: 'center', color: 'gray'}}>There are no results for that search...</h1>)
            }
            for (let i = 0; i <data[ls].data.length; i++) {
                if (data[ls].data[i].document.type === 'tweet' && filterObject['TWEET']) {
                    data[ls].data[i].document.position = "Past"
                    elements.push(<Tweet data={data[ls].data[i].document} />)
                }
                else if (data[ls].data[i].document.type === 'reddit' && filterObject['REDDIT']) {
                    data[ls].data[i].document.position = "Past"
                    elements.push(<RedditBlock data={data[ls].data[i].document} />)
                }
                else if (data[ls].data[i].document.type === 'movie' && filterObject['MOVIE']) {
                    data[ls].data[i].document.position = "Past"
                    elements.push(<MovieBlock data={data[ls].data[i].document}/>)
                }
                else if (data[ls].data[i].document.type === 'tv' && filterObject['TV']) {
                    data[ls].data[i].document.position = "Past"
                    elements.push(<TvBlock data={data[ls].data[i].document} />)
                }
                else if (data[ls].data[i].document.type === 'spotify' && filterObject['SPOTIFY']) {
                    data[ls].data[i].document.position = "Past"
                    elements.push(<SongBlock data={data[ls].data[i].document} />)
                }
                else if (data[ls].data[i].document.type === 'youtube' && filterObject['YOUTUBE']) {
                    data[ls].data[i].document.position = "Past"
                    elements.push(<YoutubeBlock data={data[ls].data[i].document} />)
                }
                else if (data[ls].data[i].document.type === 'twitch' && filterObject['TWITCH']) {
                    data[ls].data[i].document.position = "Past"
                    elements.push(<TwitchBlock data={data[ls].data[i].document} />)
                }
            }
        } 
        //elements.push( <Footer footerOpen={footerOpen} setFooterOpen={setFooterOpen} visible={true} />);
        return elements
    }
    const returnFooter = (data) => {
        if (data.length != 0)
        {
            return <Footer footerOpen={footerOpen} setFooterOpen={setFooterOpen} />
        }
    }
    


    return (
        <div >
            <div className="adjustFooter" >
                <div id="spacer" className={classes.spacer}></div>
                {loading ? <WaveLoading />: null}
            
                {filterObject.searchLength !== 0 ? displaySearchData(filterObject.searchData).map(item =>(item)) : displayData(data).map(item =>(item))}
            </div>
            <div>
                {filterObject.searchLength !== 0 ? returnFooter(filterObject.searchData): returnFooter(data)}
            </div>
            {/* {!loading ? <Footer footerOpen={footerOpen} setFooterOpen={setFooterOpen} visible={true} /> :  <Footer footerOpen={footerOpen} setFooterOpen={setFooterOpen} visible={false} /> } */}
            {/* {displayData(data).map(item =>(item))} */}

        </div>
    )
}

export default Home
