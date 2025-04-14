import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {
    const { handelRegister, handelGoogleLogin } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [role, setRole] = useState("student");
    const navigate = useNavigate();


    const validatePassword = (password) => {
        if (!/[A-Z]/.test(password)) {
            return "Password must have at least one uppercase letter.";
        }
        if (!/[a-z]/.test(password)) {
            return "Password must have at least one lowercase letter.";
        }
        if (password.length < 6) {
            return "Password must be at least 6 characters long.";
        }
        return "";
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const error = validatePassword(password);
    //     if (error) {
    //         setPasswordError(error);
    //         return;
    //     }
    //     setPasswordError("");
    //     try {
    //         await handelRegister(email, password);
    //         Swal.fire("Success", "Registration successful!", "success");
    //         navigate("/");
    //     } catch (error) {
    //         Swal.fire("Error", error.message, "error");
    //     }
    // };

    const handleGoogleLogin = async () => {


        try {
            await handelGoogleLogin();
            Swal.fire("Success", "Google login successful!", "success");
            navigate("/");
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const error = validatePassword(password);
        if (error) {
            setPasswordError(error);
            return;
        }
        setPasswordError("");
    
        const userObject = {
            name,
            email,
            password,
            role: role.toUpperCase(),
        };
        console.log(userObject);
    
        try {
            const response = await fetch("http://localhost:5173/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userObject),
            });
    
            const text = await response.text(); // get raw text first
            const data = text ? JSON.parse(text) : {}; // safely parse if not empty
    
            if (response.ok) {
                Swal.fire("Success", "Registration successful!", "success");
                console.log("Response from backend:", data);
                navigate("/");
            } else {
                Swal.fire("Error", data.message || "Registration failed", "error");
            }
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };
    
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <h1 className="text-5xl font-bold">Register Now!</h1>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="input input-bordered"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="input input-bordered"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="input input-bordered"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {passwordError && (
                                <p className="text-red-500 text-sm mt-2">{passwordError}</p>
                            )}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">
                                    Role <span className="ml-1"></span>
                                </span>
                            </label>
                            <select
                                className="select select-bordered"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="student">Student</option>
                                <option value="educator">Teacher</option>
                            </select>
                        </div>

                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                            
                        </div>
                        <div className="mt-4 text-center">
                            <p>
                                Already have an account?{" "}
                                <a href="/login" className="link link-primary">
                                    Login here
                                </a>
                            </p>
                        </div>
                    </form>
                    <div className="card-body">
                        <button onClick={handleGoogleLogin} className="btn btn-secondary">
                            <i className="fa-brands fa-google"></i>
                            Register with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Register;