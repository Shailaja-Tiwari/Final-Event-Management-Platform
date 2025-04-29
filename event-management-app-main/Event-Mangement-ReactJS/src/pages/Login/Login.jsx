import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

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
            const response = await fetch('http://localhost:5000/login', {
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

            if (result.success) {
                alert(result.message); // Show success message
                // Redirect to home or another page
                navigate('/');
            } else {
                alert(result.message); // Show error message
            }
        } catch (err) {
            alert('An error occurred: ' + err.message);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow-lg p-4 rounded-3">
                        <h2 className="text-center mb-4 text-primary">Login</h2>
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter your email..."
                                    value={loginInfo.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Enter your password..."
                                    value={loginInfo.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100 py-2">Login</button>
                        </form>
                        <div className="text-center mt-3">
                            <p>Don't have an account? <a href="/register" className="text-decoration-none">Register here</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
