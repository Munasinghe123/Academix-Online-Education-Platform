import React, { useState } from 'react'

import axios from 'axios';

function AddCourseProviders() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')

    const addCourseProvider = async (event) => {

        event.preventDefault();

        const formData = {
            name, email, password, role
        }

        const token = localStorage.getItem('token');

        const response = await axios.post(`http://localhost:7001/api/users/addCourseProvider`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status === 200) {
            alert('Course Provider created successfully')
        } else {
            alert("Failed to create course provier")
        }
    }

    return (
        <div className='form-container'>
            <div className='form-card'>
                <h1 className='mb-6 text-2xl font-bold text-center text-blue-600'>Add Course Providers</h1>

                <form className='addusers-form' onSubmit={addCourseProvider}>

                    <label>Name</label>
                    <input type='text' name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} /><br /><br />

                    <label>Email</label>
                    <input type='Email' name="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} /><br /><br />

                    <label>Password</label>
                    <input type='password' name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} /><br /><br />

                    <label>Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}>
                        <option value="">Select the role</option>
                        <option value="courseProvider">Course Provider</option>
                    </select> <br /><br />

                    <button type='submit'>Add Course Provider</button>
                </form>
            </div>
        </div>
    )
}

export default AddCourseProviders;
