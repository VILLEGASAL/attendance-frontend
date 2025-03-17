import React, { useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { baseUrl } from './Login.jsx';


export const Signup = () => {

    const navigate = useNavigate();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleFirstnameInput = (event) => {

        setFirstname(event.target.value);
    }

    const handleLastnameInput = (event) => {

        setLastname(event.target.value);
    }

    const handleUsernameInput = (event) => {

        setUsername(event.target.value);
    }

    const handlePasswordInput = (event) => {

        setPassword(event.target.value);
    }

    const handleSubmitForm = async(event) => {

        try {

            event.preventDefault();

            const result = await axios.post(`${baseUrl}/auth/register`, {

                firstName: firstname,
                lastName: lastname,
                username: username,
                password: password,
                
            }, {

                headers:{ "Content-Type": "application/x-www-form-urlencoded" }
            })

            if(result.status === 200){

                navigate("/login")    
            }
            
        } catch (error) {

            if(error.response.status != 200){

                console.log(error.response.data.message);   
            }   
        }
    }

    useEffect(() => {

        const checkAuth = async() => {

            try {

                const response = await axios.get(`${baseUrl}/auth/check-auth`, {

                    withCredentials: true
                });
                

                if(response.status === 200){

                    navigate("/home");
                }
                
            } catch (error) {
                
                if(error.response.status === 401){
                    
                    console.log("Not Authenticated");

                }
            }
        }

        checkAuth();
    }, []);

    return (

    <>
        <div>
            <h1>SIGNUP</h1>

            <form onSubmit={handleSubmitForm}>

                <div>
                    <label htmlFor="firstname">Firstname:</label>
                    <input type="text" name="firstname" id="firstname" placeholder='eg. John' onChange={handleFirstnameInput} value={firstname} />
                </div>

                <div>
                    <label htmlFor="lastname">Lastname:</label>
                    <input type="text" name="lastname" id="lastname" placeholder='eg. Doe' onChange={handleLastnameInput} value={lastname} />
                </div>

                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" id="username" placeholder='eg. doejohn' onChange={handleUsernameInput} value={username} />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" onChange={handlePasswordInput} value={password} />
                </div>

                <div>
                    <button type="submit">Signup</button>
                </div>

                <div>
                    <Link to="/login">Login</Link>
                </div>

            </form>
        </div>
    </>

    )
}
