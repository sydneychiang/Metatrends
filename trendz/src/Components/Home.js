import React from 'react'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    test: {
        color: 'red'
    }
}));

function Home() {
    const classes = useStyles();

    return (
        <div>
            <h1 className={classes.test}> test</h1>
        </div>
    )
}

export default Home
