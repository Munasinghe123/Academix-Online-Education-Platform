import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { AuthContext } from '../../../context/AuthContext'
import { useContext } from 'react'

import './Login.css'

function Login() {

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [password, setpassword] = useState('');

    const submitLogin = async (event) => {

        event.preventDefault();

        const user = { name, password }

        const response = await axios.post(`http://localhost:7001/api/users/login`, user);

        const token = response.data.token;
        console.log("token", token)

        //sending the token for the login function of AuthContext
        login(token);

        const decode = jwtDecode(token);
        console.log("decoded token", decode);

        if (decode.role === "user") {
            navigate('/UserDashBoard')
        } else if (decode.role === "courseProvider") {
            navigate('/courseProviderDashBaord')
        } else if (decode.role === "admin") {
            navigate('/adminDashBoard')
        }
    }

    return (
        <div className='Login-container'>
            <h1>Login</h1>

            <form className='login-form' onSubmit={submitLogin}>

                <label htmlFor='name'>Name</label>
                <input type='text' name='name' id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)} /> <br /><br />

                <label htmlFor='password'>Password</label>
                <input type='password' name='password' id='password'
                    value={password}
                    onChange={(e) => setpassword(e.target.value)} /> <br /><br />

                <button type='submit' >Login</button>
            </form>
        </div>
    )
}

export default Login
