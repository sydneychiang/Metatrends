import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Filter from '../Components/Filter';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import '../index.css';
import { Hidden } from '@material-ui/core';
import './Header.css';
import Calendar from "../Components/Calendar";
import DateTimePicker from "../Components/DateTimePicker";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

let timeStore = "loading"
const useStyles = makeStyles((theme) => ({
    arrow: {
        // textAlign: "center",
        color:"white",
        fontSize: "15px",
        fontFamily: "Comfortaa",
        position: "absolute",
        bottom: "0",
        left:"50%",
        marginLeft:"-6px",
        marginBottom: "1em",
        zIndex: "1",
    },

}));


function getDateString(){
    let d = new Date()
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
    const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(d)
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
    return `${mo} ${da}, ${ye}`
}



function barExpand(isActive, time, originalBarHeight, setHeaderOpen, footerOpen, setFooterOpen){
    let bar = document.getElementsByClassName("bar")[0];
    let animate = document.getElementById("animate");

    // if (footerOpen){
    //     setFooterOpen(false);
    //     console.log(footerOpen);
    // }

    if(isActive){
        //expand
        bar.style.transitionDuration = "0.6s";
        openHeader(bar, animate, time, originalBarHeight);
        setHeaderOpen(true);
    }
    else{
        //close
        bar.style.transitionDuration = "0.4s";
        minimizeHeader(bar, animate, originalBarHeight);
        setHeaderOpen(false);
    }
}


function updateHeaderString(time){
    let lastUpdate = document.getElementById("lastUpdateString")
    let today = new Date();
    let update = Math.abs( today - time) / (36e5/60);
    
    if( update > 60*24*30){
        lastUpdate.textContent = "Viewing data from approximately" + Math.round(update/(60*24*30)) + (Math.round(update/(60*24*30)) == 1 ? " month ago" : " months ago") ;
    }
    else if (update > 60*24){
        lastUpdate.textContent = "Viewing data from " + Math.round(update/(60*24)) + (Math.round(update/(60*24)) == 1 ? " day ago" : " days ago");
    }
    else if (update > 60){
        lastUpdate.textContent = "Viewing data from " + Math.round(update/60) + (Math.round(update/(60)) == 1 ? " hour ago" : " hours ago");
    } else if (time == "search") {
        lastUpdate.textContent = "Showing search results..."
    }
    else{
        lastUpdate.textContent = "Viewing data from " + Math.round(update) + (Math.round(update) == 1 ? " minute ago" : " minutes ago");
    }
}

function scrollFunction() {
    let bar = document.getElementsByClassName("bar")[0];
    let title = document.getElementsByClassName("title")[0];
    let date = document.getElementsByClassName("date")[0];

    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        bar.style.height = "100px";
        title.style.paddingTop = "0.4em";
        title.style.marginBottom = "1em"
        return true;
      
    } else {
        bar.style.height = "160px";
        title.style.paddingTop = "0.6em";
        title.style.marginBottom = "0.3em";
        return false;
    }
}

function openHeader(bar, animate, time, barHeight){
    bar.style.height = "40em";
    updateHeaderString(time);
    
    animate.className = "rotate";
    if(barHeight){
        let title = document.getElementsByClassName("title")[0];
        title.style.marginBottom= "0.3em";
    }
}

function minimizeHeader(bar, animate, barHeight){
    if(barHeight){
        bar.style.height = "100px";
        let title = document.getElementsByClassName("title")[0];
        title.style.marginBottom="1em";
    }
    else{
        bar.style.height = "160px";
    }
    animate.className = "notrotate";
}

function Header({time, headerOpen, setHeaderOpen, footerOpen, setFooterOpen}) {
    const classes = useStyles();
    const dispatch = useDispatch()

    const filterObject = useSelector(state => state.appReducers)

    // false is original height, true is small height
    const [barHeight, setBarHeight] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [searchData, setSearchData] = useState([]);
    //toggle is true if header is closed, false if header is open
    const [toggle, setToggle] = useState(true);
    const [newTime, setNewTime] = useState(new Date(time));
    useEffect(() => {
        if (time == "search") {
            setNewTime("search")
        } else {
            setNewTime(new Date(time))
        }
    }, [time])

    useEffect(()=> {
        updateHeaderString(filterObject.date)
    }, [filterObject.date])
   
    
    let bar = document.getElementsByClassName("bar")[0];
    let scroll = document.addEventListener("scroll", function(){
        if(!toggle){
            setToggle(!toggle);
            barExpand(toggle, newTime, barHeight, setHeaderOpen);
        }
    });

    window.onscroll = function() {
        setBarHeight(scrollFunction());
        
    };

    async function changeSearch(keywords){
        if (keywords.length < 50) {
            const link = `https://metatrends.live/api/searchRecentTrendingDataUnique?keywords=${keywords}`
            axios.get(link).then(response => {
            dispatch({ type: 'SET_SEARCH_LENGTH', payload: keywords.length})
            dispatch({ type: 'SET_SEARCH_DATA', payload: response.data})
            dispatch({ type: 'SET_TIME', payload: response.data.time})
            let lastUpdate = document.getElementById("lastUpdateString");
            //console.log(response.data.time)
            

            if (keywords.length != 0 ) {
                if(lastUpdate.textContent != "Showing search results...")
                {
                    timeStore = lastUpdate.textContent
                }
                lastUpdate.textContent = "Showing search results..."
            } else {
                let lastUpdate = document.getElementById("lastUpdateString");
                console.log('TIMESTORE IS ', timeStore)
                lastUpdate.textContent = timeStore
            }
            
            

            });
        }
        
        // barExpand(toggle, newTime, barHeight, setHeaderOpen, footerOpen, setFooterOpen);    
        
        //console.log(response.data)
    }


    //`https://metatrends.live/api/searchRecentTrendingDataUnique?keywords=${keywords}`
    return (
        <div className="root">
        
             <div className="bar" onClick={() => {
                    setToggle(!toggle);
                    barExpand(toggle, newTime, barHeight, setHeaderOpen, footerOpen, setFooterOpen);               
                 }}>
            
                <Toolbar>
                    <Grid container spacing={0} >
                        <Grid item xs={12} id="titleGrid">
                            <div className="title" onClick={event=>{
                                event.stopPropagation();
                                window.location.reload();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}>
                                metatrends
                            </div>
                        
                        </Grid>
                        <Grid item xs={12}>
                            <p className="date">
                                {getDateString()}
                            </p>
                        </Grid>
                        <Grid item xs={12}>

                        </Grid>
                        <Grid item xs={12}>
                            <span id="lastUpdateString" className="date">
                            </span>
                            <div className="outerSearch">
                                <input type="text" className="searchBar" placeholder="Search" onClick={event=>{event.stopPropagation()}} onChange={event => {changeSearch(event.target.value)}}/> 
                            </div>
                            <div>

                                <DateTimePicker />
                                <Filter />
                            </div>


                        </Grid>
                    </Grid>
                </Toolbar>
                <span className={classes.arrow}>
                    <span id="animate" className="notrotate">v
                    </span>       
                </span>
             </div>
             

        </div>
    )
}

export default Header
