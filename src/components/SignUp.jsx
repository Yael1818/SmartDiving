import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import "../css/SignUp.css";

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isLoading, error } = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signUp(formData))
            .then(() => {
                navigate("/home");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>הרשמה</h2>
                
                <form className="signup-form" onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="signup-input" />
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="signup-input" />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="signup-input" />
                    <button type="submit" disabled={isLoading} className="signup-button">Sign Up</button>
                </form>
                {isLoading && <p className="loading-text">Loading...</p>}
                {error && <p className="error-text">{error}</p>}
            </div>
        </div>
    );
};

export default SignUp;
