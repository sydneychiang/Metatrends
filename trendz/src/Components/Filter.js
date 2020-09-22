import React, { useEffect, useState } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// import './Home.css';

// const theme = createMuiTheme({
//   overrides: {
//     // Style sheet name ⚛️
//     MuiButtonBase: {
//       // Name of the rule
//       root: {
//         // Some CSS
//         color: 'white',
//       },
//     },
//   },
// });



const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '600px',
        margin: '0 auto',
    },
    check: {
      color: "white!important",
      opacity: "80%",

    },
    textStyle: {
      fontFamily: "Roboto!important",
      fontSize: "15px",
      color: "white",

    },
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
        <div id="filter">
            <List dense className={classes.root}>
        {[0, 1, 2, 3, 4, 5].map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem key={value} button >
              <ListItemText id={labelId}  primary={<span className={classes.textStyle}>{`${platforms[value]}`}</span>}/>
              <ListItemSecondaryAction>
                <Checkbox
                  className = {classes.check}
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
      {/* <button onClick={event => {console.log(checked)}}>check array</button> */}
        </div>
    )
}

export default Filter
