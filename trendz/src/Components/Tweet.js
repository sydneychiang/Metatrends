import React from 'react';
import './Tweet.css';
import Divider from '@material-ui/core/Divider';

function Tweet() {
    return (
        <div className="tweet">
            <p className="text">Tweet</p>
            <Divider variant="middle" style={{marginBottom: '15px'}} />

        </div>
    )
}

export default Tweet
