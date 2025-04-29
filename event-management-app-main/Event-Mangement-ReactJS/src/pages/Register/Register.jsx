import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
    const [registerInfo, setRegisterInfo] = useState({
        name: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterInfo({ ...registerInfo, [name]: value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const { name, email, password } = registerInfo;

        // Basic validation
        if (!name || !email || !password) {
            alert('Name, email, and password are required');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerInfo),
            });

            // Check if the response is OK (status in the range 200-299)
            if (!response.ok) {
                const errorMessage = await response.text(); // Get the error message as text
                throw new Error(errorMessage || 'Registration failed');
            }

            const result = await response.json(); // Parse the JSON response
            console.log(result); // Log the result to see the full response

            if (result.success) {
                alert(result.message); // Show success message
                // Redirect to login or home page
                navigate('/login');
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
                        <h2 className="text-center mb-4 text-primary">Create an Account</h2>
                        <form onSubmit={handleRegister}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Enter your name..."
                                    value={registerInfo.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter your email..."
                                    value={registerInfo.email}
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
                                    value={registerInfo.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100 py-2">Register</button>
                        </form>
                        <div className="text-center mt-3">
                            <p>Already have an account? <a href="/login" className="text-decoration-none">Login here</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
