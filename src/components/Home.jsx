import React from "react";
import axios from "axios";
import styles from "../styles/home.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Employee } from "./Employee.jsx";
import { TimeForm } from "./TimeForm.jsx";
import { Records } from "./Records.jsx";

import { baseUrl } from "./Login.jsx";
import { Spinner } from "./Spinner.jsx";

export const Home = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [totalHours, setTotalHours] = useState(0);
    const [remainingHours, setRemainingHours] = useState(270);
    const [isLoadingToRender, setIsLoadingToRender] = useState(true);
    const [attendance, setAttendance] = useState([]);

    const fetchData = async () => {

        try {

            const response = await axios.get(`${baseUrl}/auth/check-auth`, { withCredentials: true });

            setName(`${response.data.first_name.toLocaleUpperCase()} ${response.data.last_name.toLocaleUpperCase()}`);
            setTotalHours(response.data.total_hours);
            setRemainingHours(response.data.remaining_hours);
            
            console.log(response.data);
            
            return response.data

        } catch (error) {

            console.error("Error fetching employee data:", error);
        }
    }

    const fetchAttendance = async () => {

        try {

            const results = await axios.get(`${baseUrl}/attendance`, { withCredentials: true });

            setAttendance(Array.isArray(results.data) ? results.data : [results.data]);

        } catch (error) {

            console.error("Error fetching attendance data:", error);
        }
    };

    const { data, isLoading, error, refetch } = useQuery({
        
        queryKey: ["logoutUser"],

        queryFn: async () => {

            try {

                const logoutUser = await axios.delete(`${baseUrl}/auth/logout`, {

                    withCredentials: true
                });

                return logoutUser;
                                
            } catch (error) {
                
                if (error.status != 200) {
                    
                    window.location.href = "/login";
                }

                console.log(error.message);

                return {}
                
            }
        }, 
        
        enabled: false,
    });

    const handleLogoutBtn = async (event) => {
        
        await refetch();
    }

    //Check If authenticated
    useEffect(() => {

        const checkAuth = async() => {

            try {

                let response = await axios.get(`${baseUrl}/auth/check-auth`, {

                    withCredentials: true
                });

                if(response.status === 200){

                    setIsLoadingToRender(false);

                    await fetchData();
                    await fetchAttendance();
                    
                }
                

            } catch (error) {
                
                console.log(error.response);
                
                if (error.response.status === 401) {
                    
                    navigate("/login");
                }
            }
        }

        checkAuth();
    }, []);

    return(
        <>
            {
                isLoadingToRender ? <Spinner /> :

                <div className={styles.home} >
                    <div className={styles.employee_details_container}>
                        <Employee 
                            name={name.toLocaleUpperCase()} 
                            total_hours={totalHours} 
                            remaining_hours={remainingHours} />

                        <button onClick={handleLogoutBtn} disabled={isLoading}>
                            {isLoading ? "Logging Out..." : "Log Out"}
                        </button>
                        
                    </div>

                    <div className={styles.form_container}>
                        <TimeForm fetchEmployeeData={fetchData} refreshAttendance={fetchAttendance}/>
                    </div>

                    <div className={styles.employee_records_container}>
                        <Records attendance={attendance}/>
                    </div>
                </div>
            }
        </>
    );
}