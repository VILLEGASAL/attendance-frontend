import { Routes, Route, useNavigate } from "react-router-dom";
import { Signup } from "./components/Signup.jsx";
import { Login } from "./components/Login.jsx";
import { Home } from "./components/Home.jsx";


export const App = () => {
  
  return (
    <Routes>

      <Route 
        exact
        path="/"
        element={<Signup />}
      />

      <Route 
        path="/login"
        element={<Login />}
      />

      <Route 
        path="/home"
        element={<Home />}
      />

    </Routes>
  )
}


