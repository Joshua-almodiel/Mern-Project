import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.css';

function LoginUser () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    /**
     * Handles the login functionality.
     * 
     * @param {Event} e - The event triggered by the form submission.
     */
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post('http://localhost:3001/', {
                email,
                password
            });

            if (response.status === 200) {
                // Assuming your server returns a token or some other authentication data
                const token = response.data.token;
                localStorage.setItem('token', token);
                navigate('/home');
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            setError('An error occurred while logging in');
        }
    };

    return (
        <div className={styles["loginContainer"]}>
            <div className={styles["loginBody"]}>
                <h2 className={styles["h2"]}>Login Form</h2>

                {error && <p className={styles["error"]}>{error}</p>}

                <form onSubmit={handleLogin}>
                    <div className={styles["inputGroup"]}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            name="email"
                            autoComplete="off"
                            className={styles["inputEmail"]}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles["inputGroup"]}>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            autoComplete="off"
                            className={styles["inputPassword"]}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles["btn"]}>
                        <p>Don't have an account?</p>
                        <Link to="/register" className={styles["regisBtn"]}>Sign up</Link>
                        <button type="submit" className={styles["loginBtn"]}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginUser ;