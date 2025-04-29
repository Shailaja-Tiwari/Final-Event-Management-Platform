import React, { useEffect, useState } from 'react';

function Home() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProtectedData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setMessage('No token found. Please log in.');
                return;
            }

            try {
                const res = await fetch('http://localhost:5000/protected', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await res.json();
                if (res.ok) {
                    setMessage(data.message);
                } else {
                    setMessage(data.message || 'Access denied.');
                }
            } catch (error) {
                setMessage('Error fetching protected content.');
            }
        };

        fetchProtectedData();
    }, []);

    return (
        <div>
            <h1>Welcome to Home Page</h1>
            <p>{message}</p>
        </div>
    );
}

export default Home;
