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



function barExpand(isActive, time){
    // console.log("here")
    
    let bar = document.getElementsByClassName("bar")[0];
    let animate = document.getElementById("animate");

    if(isActive){
        //expand
        openHeader(bar, animate, time);
        
    }
    else{
        //close
        minimizeHeader(bar, animate);
    }
}

function openHeader(bar, animate, time){
    let lastUpdate = document.getElementById("lastUpdateString");
    bar.style.height = "40em";
    let today = new Date();
    let update = Math.abs( today - time) / (36e5/60);
    lastUpdate.textContent = "Last updated " + Math.round(update) + " minutes ago";
    animate.className = "rotate";
}

function minimizeHeader(bar, animate){
    bar.style.height = "160px";
    animate.className = "notrotate";
}

function Header(time) {
    const classes = useStyles();
    const [showFilter, setShowFilter] = useState(false);

    const [toggle, setToggle] = useState(true);
    let newTime = new Date(time.time);
    let bar = document.getElementsByClassName("bar")[0];
    let scroll = document.addEventListener("scroll", function(){
        if(!toggle){
            setToggle(!toggle);
            barExpand(toggle, newTime);
        }
    });

    // let click = document.addEventListener("click", function(event){
    //     var isClickInside = bar.contains(event.target);
        
    //     console.log("toggle1: ", toggle);
    //     if(!isClickInside){
    //         setToggle(!toggle);
    //         barExpand(toggle,newTime);
    //     }

    // });

    return (
        <div className="root slide-bottom">
        
             <div id="testing" className="bar" onClick={() => {
                    setToggle(!toggle);
                    barExpand(toggle, newTime);               
                 }}>
            
                <Toolbar>
                    <Grid container spacing={0} >
                        <Grid item xs={12} id="titleGrid">
                            <div className="title" onClick={event=>{
                                event.stopPropagation();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}>
                            {/* onClick={window.scrollTo({ top: 0, behavior: 'smooth' })} */}
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
                            {/* <Calendar /> */}
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
