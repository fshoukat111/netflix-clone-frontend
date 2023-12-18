import React, { useState } from 'react';
import './signup.css';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const SignupComponent = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        age: '',
        email: '',

    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSignupRequest = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://backend-netflix.azurewebsites.net/signup', {
            // const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Handle the response data, if needed
            const responseData = await response.json();
            setFormData({
                username: '',
                password: '',
                age: Number(''),
                email: '',
            });
            console.log('Response data:', responseData);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const routeToSingIn = () => {
        navigate("/signin")
    }

    return (
        <div>
            <form className='form-div' onSubmit={handleSignupRequest}>
                <h2 className="center-div">Signup</h2>
                <div className="form-data">
                    <input className="input-class" type="text" name="username"
                        value={formData?.username} placeholder="username" onChange={handleChange} />
                    <input className="input-class" name="email"
                        value={formData?.email} type="email" placeholder="email" onChange={handleChange} />
                    <input className="input-class" name="password"
                        value={formData?.password} type="password" placeholder="password" onChange={handleChange} />
                    <input className="input-class" name="age"
                        value={formData?.age} type="text" placeholder="Age" onChange={handleChange} />
                    <Button  type='submit'>Submit</Button>
                </div>
                <h5>If you have account then <a className='anchor-tag' onClick={routeToSingIn}>signin</a> </h5>
            </form>
        </div>
    )
}

export default SignupComponent;