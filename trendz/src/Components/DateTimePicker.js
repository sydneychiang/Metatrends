import React, { useState } from "react";
import { DateTimePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import './DateTimePicker.css'
import './Filter.css'




const useStyles = makeStyles((theme) => ({
    // body: {
    //     backgroundColor: "red",
    // },
    // dateTimePicker: {
    //     // colior: "white",
    //     marginLeft: "auto",
    //     marginRight: "auto",
    //     textAlign: "center",
    //     width: "600px",
    // },
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

function InlineDateTimePickerDemo(props) {
    const classes = useStyles();
    const [selectedDate, handleDateChange] = useState(new Date("2018-01-01T00:00:00.000Z"));
    let d = new Date();
    let date = formatDateString(d. getDate());
    let month = formatDateString(d. getMonth() + 1); // Since getMonth() returns month from 0-11 not 1-12.
    let year = d. getFullYear();
    let hour = formatDateString(d.getHours());
    let minute = formatDateString(d. getMinutes());

    return (
        <div className="outerCircle filter">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                    onClick={event => {event.stopPropagation()}}
                    variant="inline"
                    ampm={false}
                    // label="Travel back"
                    value={`${year}-${month}-${date}T${hour}:${minute}`}
                    onChange={handleDateChange}
                    onError={console.log}
                    minDate={new Date("2018-01-01T00:00")}
                    format="MM/dd/yyyy HH:mm"
                />
            </MuiPickersUtilsProvider>
        </div>
    );
}

export default InlineDateTimePickerDemo;