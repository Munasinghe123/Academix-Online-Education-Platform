import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";

function Login() {
    const navigate = useNavigate();
    const location = useLocation(); 
    const { login } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const submitLogin = async (event) => {
        event.preventDefault();

        const user = { name, password };

        const response = await axios.post('http://localhost:7001/api/users/login', user, {
            withCredentials: true, 
        });

        const accessToken = response.data.accessToken;
        console.log("accessToken", accessToken);

        login(accessToken);

        const decode = jwtDecode(accessToken);
        console.log("decoded accessToken", decode);

    
        const redirectPath = location.state?.from || 
            (decode.role === "student" ? "/studentDashBoard" :
            decode.role === "courseProvider" ? "/CourseProviderDashBaord" :
            decode.role=== "admin" ? "/adminDashBoard" : "/register");

        navigate(redirectPath);
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <h1 className="mb-6 text-2xl font-bold text-center text-orange-600">
                    Login
                </h1>

                <form onSubmit={submitLogin}>
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
