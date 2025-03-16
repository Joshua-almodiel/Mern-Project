import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Register.module.css';

function RegisterUser() {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // Added error state for handling errors
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!fullname || !email || !password) {
            setError("All fields are required.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/register', {
                fullname, email, password
            });

            console.log(response.data);

            if (response.data.message === "Account created") {
                navigate('/home');
            } else {
                setError(response.data.message || "Registration failed. Please try again.");
            }
        } catch (err) {
            console.error("Error:", err);
            setError("An error occurred during registration. Please try again.");
        }
    };

    return (
        <div className={styles["regisContainer"]}>
            <div className={styles["regisBody"]}>
                <h2 className={styles["h2"]}>Registration Form</h2>

                {error && <p className={styles["error"]}>{error}</p>} {/* Display error if any */}

                <form onSubmit={handleRegister}>
                    <div className={styles["inputGroup"]}>
                        <label htmlFor="fullname">Full Name:</label>
                        <input 
                            type="text" 
                            placeholder="Enter Your Full Name" 
                            name="fullname" 
                            className={styles["inputFName"]}
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            required 
                        />
                    </div>

                    <div className={styles["inputGroup"]}>
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            placeholder="Enter Your Email" 
                            name="email" 
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
                            className={styles["inputPassword"]}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>

                    <div className={styles["btn"]}>
                        <p>Already have an account?</p>
                        <Link to="/">
                            <button className={styles["loginBtn"]} type="button">Login</button>
                        </Link>
                        <button className={styles["regisBtn"]} type="submit">Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterUser;
