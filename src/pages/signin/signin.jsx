import React, { useState } from 'react';
import './signin.css';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/esm/Button';

const SigninComponent = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLoginRequest = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/signin', {
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
            });
            console.log("responseData.token",responseData.token)
            localStorage.setItem("role", responseData.token.role);
            localStorage.setItem("token", responseData.token.token);
            localStorage.setItem("currentUserAge", responseData.token.age);
            if (responseData.token.role === "admin") {
                navigate("/admin/dashboard");
            }
            else if (responseData.token.role === "creator") {
                navigate("/creator/dashboard");
            }
            else if (responseData.token.role === "viewer") {
                navigate("/home");
            }
            else {
                navigate("/signin");
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const routeToSingUp = () => {
        navigate("/signup")
    }

    return (
        <div>
            <form className='form-div' onSubmit={handleLoginRequest}>
                <h2 className="center-div">SignIn</h2>
                <div className="form-data">
                    <input className="input-class" type="text" name="username"
                        value={formData?.username} placeholder="username" onChange={handleChange} />
                    <input className="input-class" name="password"
                        value={formData?.password} type="password" placeholder="password" onChange={handleChange} />
                    <Button  type='submit'>Submit</Button>
                </div>
                <h5>If you have not account then <a className='anchor-tag' onClick={routeToSingUp}>signup</a> first</h5>
            </form>
        </div>
    )
}

export default SigninComponent;