import React, { useEffect, useState } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
// import './Home.css';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '600px',
        margin: '0 auto',
    }
}));

function Filter() {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([1]);
    const platforms = ['TV', 'Reddit', 'Song', 'Tweet', 'Movie', 'YouTube'];
  
    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };
  
    useEffect(()=> {
        setChecked([0,1,2,3,4,5])
    }, [])


    return (
        <div >
            <List dense className={classes.root}>
        {[0, 1, 2, 3, 4, 5].map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem key={value} button>
              <ListItemText id={labelId} primary={`${platforms[value]}`} />
              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  onChange={handleToggle(value)}
                  checked={checked.indexOf(value) !== -1}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <button onClick={event => {console.log(checked)}}>check array</button>
        </div>
    )
}

export default Filter
