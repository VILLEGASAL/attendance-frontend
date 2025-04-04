import React from "react";
import styles from "../styles/timeForm.module.css";
import moment from "moment";
import axios from "axios";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "./Spinner.jsx";

import { baseUrl } from "./Login.jsx";

export const TimeForm = (props) => {

    const today = new Date();

    const hours = today.getHours();

    const formattedDate = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    const [timeIn, setTimeIN] = useState("");
    const [timeOut, setTimeOut] = useState("");
    const [date, setDate] = useState(formattedDate);
    const [isLoadingToAddRecord, setIsLoadingToAddRecord] = useState(false);
    const navigate = useNavigate();

    const handleDateInput = (event) => {

      setDate(event.target.value);
    };

    const handleTimeIN = (event) => {

      setTimeIN(event.target.value);
    };

    const handleTimeOUT = (event) => {

      setTimeOut(event.target.value);
    };

    const handleSubmitAttendance = async (event) => {

      event.preventDefault();

      setIsLoadingToAddRecord(true);

      try {
        const inTime = moment(timeIn, "HH:mm");
        const outTime = moment(timeOut, "HH:mm");
        const minTime = moment("08:00", "HH:mm"); // Set minimum allowed time (8:00 AM)

        


        // if(inTime.isBefore(minTime)){

        //   alert("Time in must be 8 am onwards.");
          
        // }else{

          if (outTime.isAfter(inTime)) {

            const duration = moment.duration(outTime.diff(inTime));
            //const minutes = duration.minutes();
    
            let decimalHours = duration.asHours();
    
            if (decimalHours > 4.99) {
              decimalHours--;
            }
    
            const response = await axios.post(
              `${baseUrl}/attendance/add`,
              {
                date: date,
                time_in: timeIn,
                time_out: timeOut,
                total_time: decimalHours,
              },
    
              {
                withCredentials: true,
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            );
            
            if(response.status === 200){

              await props.fetchEmployeeData();

              await props.refreshAttendance();
            }

            console.log(response.status);
          }else{
            
            setIsLoadingToAddRecord(false);
            
            alert("Time out must be greater than time in.");
          }
        //}

      } catch (error) {

        if(error.response.status != 200){

          setIsLoadingToAddRecord(false);
        }
          
        console.log(error);

      }finally{

        setIsLoadingToAddRecord(false);

        setTimeIN("");
        setTimeOut("");
      }
    };

    return (
      <form onSubmit={handleSubmitAttendance} className={styles["time-form"]}>
        <div>
          <label htmlFor="currentDate">Current Date</label>
          <input type="date" onChange={handleDateInput} value={date} id="currentDate" />
        </div>

        <div>
          <label htmlFor="timeIn">In</label>
          <input type="time" onChange={handleTimeIN} name="in" id="timeIn" value={timeIn} required />

          <label htmlFor="timeOut">Out</label>
          <input
            type="time"
            onChange={handleTimeOUT}
            name="out"
            id="timeOut"
            value={timeOut}
            required
          />
        </div>

        <div>
          {
            isLoadingToAddRecord ? <Spinner /> :

            <button className={styles.in} type="submit">
              ADD RECORD
            </button>
          }
        </div>
      </form>
    );
};
