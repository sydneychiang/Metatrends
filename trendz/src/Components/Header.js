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
        color: '#414141',
        // textAlign: 'center',
        fontFamily: 'Crete Round, serif',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '35px',
        lineHeight: '45px',
        letterSpacing: '0.06em',
        paddingTop: '0.9em',
        display: 'block',
        // paddingLeft: '12%',
    },
    bar: {
        background: '#BFD6ED',
        borderBottomLeftRadius: '20px',
        borderBottomRightRadius: '20px'
    },
    date: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '20px',
        lineHeight: '23px',
        letterSpacing: '0.06em',
        color: '#414141',
        textAlign: 'center',
        paddingBottom: '1em'
    }
}));


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
                                    <div style={{"textAlign": 'center', "display": "inline"}}>
                                    TRENDS

                                    </div>
                                    
                                    <span style={{"display": "inline"}}>
                                    <IconButton edge="start" className={classes.menuButton} aria-label="menu">
                                    <MenuIcon />
                                    </IconButton>
                                    </span>
                                </div>
                                
                                
                                
                                
                               
                            </Grid>
                            <Grid item xs={12}>
                                <p className={classes.date}>
                                    September 6, 2020
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
