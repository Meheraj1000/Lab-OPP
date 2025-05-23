import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {
    const { handleRegister } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [role, setRole] = useState("student");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const userObject = {
            name,
            email,
            password,
            role: role.toUpperCase(),
        };
        console.log(userObject);

        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userObject),
            });

            console.log(response)

            // JSON ডেটা পার্স করা
            const data = await response.json();
            console.log("Response Data:", data);

            // স্ট্যাটাস চেক করে মেসেজ দেখানো
            if (response.ok) {
                console.log("Registration Successful:", data.message);
                Swal.fire("Success", "Registration successful!", "success");
                const userInfo = {
                    email: data.email,
                    name: data.name,
                    role: data.role
                };
                handleRegister(userInfo);
                navigate("/")
            } else {
                Swal.fire("Error", error.message, "error");
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
                                <option value="TEACHER">Teacher</option>
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
                </div>
            </div>
        </div>
    );
};


export default Register;