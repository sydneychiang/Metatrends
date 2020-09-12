import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import '../index.css';
import { Hidden } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '15px',
        // flexGrow: 1,
        // position: 'sticky'
    },
    menuButton: {
        float: 'right',
        // display: 'block',
        position: 'relative'
    },
    title: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Crete Round, serif',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '50px',
        lineHeight: '45px',
        letterSpacing: '0.06em',
        paddingTop: '0.9em',
        // marginLeft: '1em',


    },
    bar: {
        alignItems: 'center',
        borderRadius: '0 0 50% 50%',
        // borderBottomRightRadius: '100%',
        maxWidth: '600px',
        height: '150px',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: '5%',
        paddingRight: '5%',
        background: 'linear-gradient(#CCBEBA, #959DA6)',
        boxShadow: 'none',
        position: 'sticky'
    },
    date: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '20px',
        lineHeight: '23px',
        letterSpacing: '0.06em',
        color: 'white',
        textAlign: 'center',
        paddingBottom: '1em'
    }
}));
function getDateString(){
    let d = new Date()
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
    const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(d)
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
    return `${mo} ${da}, ${ye}`
}

function Header() {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.root}>


            
                <AppBar position="static" className={classes.bar}>

                        <Toolbar>
                            <Grid container spacing={0} >
                                <Grid item xs={12}>
                                    <div className={classes.title}>
                                        <div>
                                        trends

                                        </div>
                                        
                                        {/* <span style={{"display": "inline"}}>
                                        <IconButton edge="start" className={classes.menuButton} aria-label="menu"> */}
                                        {/* <MenuIcon style={{'color': 'white'}} /> */}
                                        {/* </IconButton>
                                        </span> */}
                                    </div>
                                    
                                    
                                    
                                    
                                
                                </Grid>
                                <Grid item xs={12}>
                                    <p className={classes.date}>
                                        {getDateString()}
                                    </p>
                                </Grid>
                            </Grid>

                            

                        </Toolbar>

                </AppBar>
            </div>
        </div>
    )
}

export default Header
