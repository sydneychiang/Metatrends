import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tweet from '../Components/Tweet';
import Header from '../Components/Header';
import RedditBlock from '../Components/RedditBlock';
import MovieBlock from '../Components/MovieBlock';
import './Home.css';


const useStyles = makeStyles((theme) => ({

}));

function Home() {
    const classes = useStyles();

    return (
        <div className={classes.back}>
            <Header />
            <Tweet />
            <RedditBlock />
            <MovieBlock />
        </div>
    )
}

export default Home
