import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
//import { Calendar } from '@material-ui/pickers/views/Calendar/Calendar';
import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { StylesProvider } from '@material-ui/styles'
import './Calendar.css'



const useStyles = makeStyles((theme) => ({
    root: {

    },
    formDiv: {
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",

    },
    container: {
        margin: "0 auto",
    },
    textField: {
        color: "white",
    },
    MuiInputBase: {
        input: {
            color: "white!important",
        },
    },
    MuiInput: {
        input: {
            color: "white !important",
        },
    },
    input: {
        color: "white",
        fontFamily: "Roboto",
        fontSize: "18px",
    },
    underline: {
        "&&&:before": {
            borderBottomColor: "white"
          },
        "&&:after": {
        borderBottomColor: "white"
        }
    }

}));


function formatDateString(int){
    let str = int.toString()
    if(str.length < 2){
        return `0${str}`;
    }
    else{
        return str;
    }
}

const theme = createMuiTheme({
    overrides: {
        MuiInput: {
            underline: {
                // borderBottomColor: 'red !important'
                before:{
                    borderBottom: "1px solid rgba(256,256,256,0.42) !important"
                },
                after: {
                    borderBottomColor: "white !important"
                }
                // // borderBottomColor: "rgba(256,256, 256, 1) !important",
            }
        }
    }
})

function Calendar() {
    const classes = useStyles();
    let d = new Date();
    let date = formatDateString(d. getDate());
    let month = formatDateString(d. getMonth() + 1); // Since getMonth() returns month from 0-11 not 1-12.
    let year = d. getFullYear();
    let hour = formatDateString(d.getHours());
    let minute = formatDateString(d. getMinutes());

    return (
        <div className={classes.formDiv} onClick={event => {event.stopPropagation()}}>
            <MuiThemeProvider theme={theme}>
                <StylesProvider >
                    <form className={classes.container} noValidate>
                        <TextField
                            id="datetime-local"
                            label="Select Date"
                            type="datetime-local"
                            defaultValue={`${year}-${month}-${date}T${hour}:${minute}`}
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            InputProps= {{
                                classes: {
                                    input: classes.input,
                                    underline: classes.underline
                                }
                            }}
                        />
                    </form>
                </StylesProvider>
            </MuiThemeProvider>
        </div>
    )
}

export default Calendar
