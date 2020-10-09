import React, { useEffect, useState } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';



function Test() {
    const dispatch = useDispatch()

    const [checked, setChecked] = React.useState([1]);
    const platforms = ['Movie', 'Reddit', 'Spotify', 'TV', 'Tweet', 'Twitch', 'Youtube'];
    const filterObject = useSelector(state => state.appReducers)

  
    const handleToggle = (value) => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
      dispatch({ type: `SET_${platforms[value].toUpperCase()}`, payload: !filterObject[`${platforms[value].toUpperCase()}`] })
    };
  
    useEffect(()=> {
        setChecked([0,1,2,3,4,5, 6])
    }, [])


    return (
        <div  onMouseDown={event=>{event.stopPropagation()}}>
            <List dense >
        {[0, 1, 2, 3, 4, 5, 6].map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem key={value} button>
              <ListItemText id={labelId}  primary={<span>{`${platforms[value]}`}</span>}/>
              <ListItemSecondaryAction>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      {/* <button onClick={event => {console.log(checked)}}>check array</button> */}
        </div>
    )
}

export default Test
