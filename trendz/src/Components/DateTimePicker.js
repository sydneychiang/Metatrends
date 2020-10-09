import React, { useEffect, useState } from 'react';
import { DateTimePicker, KeyboardDatePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import './DateTimePicker.css'
import './Filter.css'
import { useSelector, useDispatch } from 'react-redux';




const useStyles = makeStyles((theme) => ({
    // calendar: {
    //     color: "black !important"
    // }
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
    const [selectedDate, handleDateChange] = useState(new Date());
    const dispatch = useDispatch()
    const overallDate = useSelector(state => state.appReducers)
    
    // let d = new Date();
    // let date = formatDateString(d. getDate());
    // let month = formatDateString(d. getMonth() + 1); // Since getMonth() returns month from 0-11 not 1-12.
    // let year = d. getFullYear();
    // let hour = formatDateString(d.getHours());
    // let minute = formatDateString(d. getMinutes());
    useEffect(()=> {
        let check1 = Math.round(new Date().getTime()/10000);
        let check2 = Math.round(new Date(selectedDate).getTime()/10000)
        if (check1 !== check2 ) {
            dispatch({ type: `SET_DATE`, payload: selectedDate})
            console.log("HAPPENING")
            console.log(check1)
            console.log(check2)

        }
        
    }, [selectedDate])

    return (
        <div className="outerCircle filter" onMouseDown={event => {event.stopPropagation()}}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    onClick={event => {event.stopPropagation()}}
                    variant="inline"
                    ampm={false}
                    // label="Travel back"
                    value={`${selectedDate.getFullYear()}-${formatDateString(selectedDate. getMonth() + 1)}-${formatDateString(selectedDate.getDate())}T${formatDateString(selectedDate.getHours())}:${formatDateString(selectedDate. getMinutes())}`}
                    onChange={ event => {
                        handleDateChange(event);
                        
                    }}
                    onError={console.log}
                    minDate={new Date("2020-09-25T00:00")}
                    format="MM/dd/yyyy HH:mm"
                    disableFuture
                />
            </MuiPickersUtilsProvider>
        </div>
    );
}

export default InlineDateTimePickerDemo;