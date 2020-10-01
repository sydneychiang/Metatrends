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



function barExpand(isActive, time, originalBarHeight){
    let bar = document.getElementsByClassName("bar")[0];
    let animate = document.getElementById("animate");

    if(isActive){
        //expand
        bar.style.transitionDuration = "0.6s";
        openHeader(bar, animate, time, originalBarHeight);
        
    }
    else{
        //close
        bar.style.transitionDuration = "0.4s";
        minimizeHeader(bar, animate, originalBarHeight);
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
    let lastUpdate = document.getElementById("lastUpdateString");
    bar.style.height = "40em";
    let today = new Date();
    let update = Math.abs( today - time) / (36e5/60);
    if (update > 60){
        lastUpdate.textContent = "Last updated " + Math.round(update/60) + " hours ago";
    }else{
        lastUpdate.textContent = "Last updated " + Math.round(update) + " minutes ago";
    }
    
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

function Header(time) {
    const classes = useStyles();
    const dispatch = useDispatch()



    // false is original height, true is small height
    const [barHeight, setBarHeight] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [searchData, setSearchData] = useState([]);
    //toggle is true if header is closed, false if header is open
    const [toggle, setToggle] = useState(true);


    let newTime = new Date(time.time);
    let bar = document.getElementsByClassName("bar")[0];
    let scroll = document.addEventListener("scroll", function(){
        if(!toggle){
            setToggle(!toggle);
            barExpand(toggle, newTime, barHeight);
        }
    });

    window.onscroll = function() {
        setBarHeight(scrollFunction());
        
    };

    async function changeSearch(keywords){
        const link = `https://metatrends.live/api/searchRecentTrendingDataUnique?keywords=${keywords}`
        axios.get(link).then(response => {
            console.log(response.data.data)
            dispatch({ type: 'SET_SEARCH_DATA', payload: response.data.data})
        });
        
        
        //console.log(response.data)
    }

    useEffect(() => {
        if (searchData) {
            

        }
    }, [searchData])

    //`https://metatrends.live/api/searchRecentTrendingDataUnique?keywords=${keywords}`
    return (
        <div className="root">
        
             <div className="bar" onClick={() => {
                    setToggle(!toggle);
                    barExpand(toggle, newTime, barHeight);               
                 }}>
            
                <Toolbar>
                    <Grid container spacing={0} >
                        <Grid item xs={12} id="titleGrid">
                            <div className="title" onClick={event=>{
                                event.stopPropagation();
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
                            <div>
                                <input type="text" onClick={event=>{event.stopPropagation()}} onChange={event => {changeSearch(event.target.value)}}/> 

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
