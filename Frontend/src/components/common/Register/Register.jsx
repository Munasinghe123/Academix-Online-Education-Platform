import React, { useState } from 'react'
import axios from 'axios'

import './Register.css';
import { useNavigate } from 'react-router-dom';

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [photo, setPhoto] = useState(null);

    const submitRegister = async (event) => {

        event.preventDefault();

        // const newUser = {
        //     name, email, password
        // }

        const formData = new FormData();

        formData.append("name", name)
        formData.append("password", password)
        formData.append("email", email)
        formData.append("photo", photo)


        const response = await axios.post(`http://localhost:7001/api/users/register`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

        if (response.status === 200) {
            alert('Registered successfully');
            navigate('/login');
        } else {
            alert("Couldnt register")
            console.log(response.err);
        }
    }

    const photoUpload = (e) => {
        setPhoto(e.target.files[0]);
    }


    return (
        <div className='form-container'>
            <div className='form-card'>
                <h1 >Register</h1>

                <form className='register-form' onSubmit={submitRegister}>

                    <label htmlFor='name'>Name</label>
                    <input type='text' name='name' id='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)} /> <br /><br />

                    <label>Password</label>
                    <input type='password' name='password' id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} /> <br /><br />

                    <label>Email</label>
                    <input type='email' name='email' id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} /> <br /><br />

                    <label htmlFor='photo'>Profile Picture</label>
                    <input
                        type='file'
                        accept='*/image'
                        name='photo'
                        onChange={photoUpload}
                    />

                    <button type='submit'>Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register
