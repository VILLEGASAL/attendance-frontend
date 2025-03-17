import React from "react";
import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "../styles/login.module.css";
import { useQuery } from "@tanstack/react-query";

export const baseUrl = `https://attendance-backend-1-xwk9.onrender.com`;

export const Login = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleUsernameInput = (event) => {

        setUsername(event.target.value);
    }

    const handlePasswordInput = (event) => {

        setPassword(event.target.value);

    }

    const handleLoginForm = async (event) => {

        event.preventDefault();

        setLoading(true);

        try {

            const response = await axios.post(`${baseUrl}/auth/login`, {

                username: username,
                password: password
            }, {

                
                withCredentials: true,
                headers: {

                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });

            

            if(response.status === 200){

                setIsLoggedIn(true);

                navigate("/home");
                
            }
            
        } catch (error) {
            
            if (error.response.status === 401) {
                
                setIsLoggedIn(false);
                console.log(error.response.status);
            }

            setLoading(false);

            console.log(error);
            
        }

        setUsername("");
        setPassword("");
    }


    useEffect(() => {

        const checkAuth = async() => {

            try {

                const checkIfAuthenticated = await axios.get(`${baseUrl}/auth/check-auth`, {

                    withCredentials: true
                });

                    if(checkIfAuthenticated.status === 200){

                    navigate("/home");
                }
                
            } catch (error) {
                
                if (error.response.status === 401) {
                    
                    console.log("Not Authenticated");
                }
            }
        }

        checkAuth();
    }, []);

    return(
        <div className={styles.login_container}>
            <h1 className={styles.login_text}>LOGIN</h1>

            <form onSubmit={handleLoginForm} className={styles.login_form}>
                <div className={styles.input_divisions}>
                    <label htmlFor="username" className={styles.username_label}>Username:</label>
                    <input className={styles.username_input} type="text" name="username" id="username" placeholder="eg. doejohn" onChange={handleUsernameInput} value={username} required/>
                </div>

                <div className={styles.input_divisions}>
                    <label htmlFor="password" className={styles.password_label}>Password:</label>

                    <input 
                        className={styles.password_input}
                        type="password" 
                        name="password" 
                        id="password" 
                        onChange={handlePasswordInput}
                        placeholder="Password"
                        value={password} 
                        required/>
                </div>

                <div className={styles.input_divisions}>
                    <button 
                        type="submit" 
                        className={styles.login_btn} 
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </div>

                <div className={styles.input_divisions}>
                    <Link to="/" className={styles.link_to_signup}>Signup</Link>
                </div>
            </form>
        </div>
    )

}
