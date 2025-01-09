import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";

function Login() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const submitLogin = async (event) => {
        event.preventDefault();

        const user = { name, password };

        const response = await axios.post(
            `http://localhost:7001/api/users/login`,
            user
        );

        const token = response.data.token;
        console.log("token", token);

        login(token);

        const decode = jwtDecode(token);
        console.log("decoded token", decode);

        if (decode.role === "student") {
            navigate("/studentDashBoard");
        } else if (decode.role === "courseProvider") {
            navigate("/courseProviderDashBaord");
        } else if (decode.role === "admin") {
            navigate("/adminDashBoard");
        }
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <h1 className="mb-6 text-2xl font-bold text-center text-blue-600">
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
