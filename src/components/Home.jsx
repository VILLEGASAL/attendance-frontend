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

export const Home = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [totalHours, setTotalHours] = useState(0);
    const [remainingHours, setRemainingHours] = useState(0);
    const [attendance, setAttendance] = useState('');

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

                return {}
                
                console.log(error.message);
            }
        }, 
        
        enabled: false,
    });

    const handleLogoutBtn = async (event) => {
        
        await refetch();
    }

    // const handleLogoutBtn = async(event) => {

    //     try {

    //         const logoutUser = await axios.delete("http://localhost:5000/auth/logout", {

    //             withCredentials: true
    //         });
            
    //     } catch (error) {

    //         if(error.response.status != 200){

    //             navigate("/login");
    //         }
            
    //     }
    // }

    //Check If authenticated
    useEffect(() => {

        const checkAuth = async() => {

            try {

                let checkIfAuthenticated = await axios.get(`${baseUrl}/auth/check-auth`, {

                    withCredentials: true
                });

                console.log(checkIfAuthenticated);
                
                
                setName(checkIfAuthenticated.data.user);
                setTotalHours(checkIfAuthenticated.data.total_hours);
                setRemainingHours(checkIfAuthenticated.data.remaining_hours);

            } catch (error) {
                
                if (error.response.status === 401) {
                    
                    navigate("/login");
                }
            }
        }

        checkAuth();
    }, [attendance]);

    useEffect(() => {

        const fetchAttendance = async () => {

            const results = await axios.get(`${baseUrl}/attendance`, {

                withCredentials: true
            });

            setAttendance(Array.isArray(results.data) ? results.data : [results.data]);
        }

        fetchAttendance();
    }, []);

    return(
        <div className={styles.home} >
            <div className={styles.employee_details_container}>
                <Employee name={name.toLocaleUpperCase()} total_hours={totalHours} remaining_hours={remainingHours} />

                
                <button onClick={handleLogoutBtn} disabled={isLoading}>
                    {isLoading ? "Logging Out..." : "Log Out"}
                </button>
                
            </div>

            <div className={styles.form_container}>
                <TimeForm />
            </div>

            <div className={styles.employee_records_container}>
                <Records attendance={attendance}/>
            </div>
        </div>
    );
}