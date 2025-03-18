import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "./Spinner.jsx";
import { baseUrl } from "./Login.jsx";
import "../styles/Signup.css"; // Import custom CSS

export const Signup = () => {

  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingToRender, setIsLoadingToRender] = useState(true);

  const handleSubmitForm = async (event) => {

    event.preventDefault();

    setIsLoading(true);

    try {
      const result = await axios.post(
        `${baseUrl}/auth/register`,
        {
          firstName: firstname,
          lastName: lastname,
          username: username,
          password: password,
        },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      if (result.status === 200) {

        

        navigate("/login");
      }

    } catch (error) {

      console.log(error.response?.data?.message || "Signup failed");

    } finally{

        setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {

      try {

        const response = await axios.get(`${baseUrl}/auth/check-auth`, {

          withCredentials: true,

        });

        if (response.status === 200) {

          navigate("/home");
        }

      } catch (error) {

        if (error.response?.status === 401) {

          console.log("Not Authenticated");
        }
      }finally{

        setIsLoadingToRender(false);
      }
    };

    checkAuth();
  }, []);

  return (

    <>
        {

            isLoadingToRender ? <Spinner /> :

            <div className="signup-container">
                <h1 className="signup-title">SIGNUP</h1>

                <form onSubmit={handleSubmitForm} className="signup-form">
                    <div className="form-group">
                    <label htmlFor="firstname">Firstname:</label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder="eg. John"
                        onChange={(e) => setFirstname(e.target.value)}
                        value={firstname}
                        required
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor="lastname">Lastname:</label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="eg. Doe"
                        onChange={(e) => setLastname(e.target.value)}
                        value={lastname}
                        required
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="eg. doejohn"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    </div>

                    {
                        isLoading ? <button type="submit" className="signup-btn" disabled>Processing...</button> :
                        <button type="submit" className="signup-btn">Signup</button>
                    }
                    

                    <p className="login-link">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        }
    </>
    
  );
};
