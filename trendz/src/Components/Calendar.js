import React, { useEffect, useState } from 'react';
import { makeStyles} from '@material-ui/core/styles';
//import { Calendar } from '@material-ui/pickers/views/Calendar/Calendar';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        color: "white",
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
    MuiFormLabel: {
        root: {
            color: "white",
        },
    }
}));

function Calendar() {
    const classes = useStyles();
    return (
        <div className={classes.formDiv}>
            <form className={classes.container} noValidate>
                <TextField
                    id="datetime-local"
                    label="Select Date"
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
            </form>
        </div>
    )
}

export default Calendar
