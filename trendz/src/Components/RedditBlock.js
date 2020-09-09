import React from 'react'
import './RedditBlock.css'
import liam from './liamNeeson.jpg'
import Divider from '@material-ui/core/Divider';

function RedditBlock() {
    return (
        <div id="redditBlock">
            <span className="reddit">Reddit</span>
            <span className="trendingNum">#10 Trending</span>

            <span className="subreddit">r/MovieDetails</span>
            <span className="description">When Liam Neeson was asked to play the antagonist in A Million Ways
             to die in the West (2014) (directed by Seth McFarlane) he accepted due to a scene in Family Guy 
             where Peter says “Imagine Liam Neeson in a Western! Ha! With that funny accent of his!”</span>
            <img src={liam} /> 
            <Divider variant="middle" style={{marginBottom: '15px'}} />
        </div>
    )
}

export default RedditBlock
