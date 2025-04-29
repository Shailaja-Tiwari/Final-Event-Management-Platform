import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;

        // Basic validation
        if (!email || !password) {
            alert('Email and password are required');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
              });
              
            // Check if the response is OK (status in the range 200-299)
            if (!response.ok) {
                const errorMessage = await response.text(); // Get the error message as text
                throw new Error(errorMessage || 'Login failed');
            }

            const result = await response.json(); // Parse the JSON response
            console.log(result); // Log the result to see the full response
            if (result.success && result.token) {
                localStorage.setItem('token', result.token); // ✅ Store token
                alert(result.message);
                navigate('/home');
            }
             else {
                alert(result.message); // Show error message
            }
        } catch (err) {
            alert('An error occurred: ' + err.message);
        }
    };

    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email..."
                        value={loginInfo.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password..."
                        value={loginInfo.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;