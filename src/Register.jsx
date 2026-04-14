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
        <section className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 px-4 py-10 sm:px-6 lg:py-14">
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 lg:flex-row lg:items-stretch">
                <div className="w-full rounded-3xl border border-cyan-100/20 bg-white/5 p-8 text-white shadow-2xl backdrop-blur-md lg:w-1/2">
                    <p className="mb-2 inline-flex rounded-full border border-cyan-200/30 bg-cyan-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
                        Join QuizApp
                    </p>
                    <h1 className="text-4xl font-black sm:text-5xl">Register Now!</h1>
                    <p className="mt-4 max-w-md text-sm text-slate-300 sm:text-base">
                        Create your account to build quizzes as a teacher or attend quizzes as a student.
                    </p>
                </div>

                <div className="w-full rounded-3xl border border-cyan-100/20 bg-slate-900/70 p-2 shadow-2xl lg:w-1/2">
                    <div className="rounded-2xl bg-slate-950/60 p-4 sm:p-6">
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-slate-200">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full rounded-xl border border-cyan-100/20 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-300 focus:outline-none"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-slate-200">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full rounded-xl border border-cyan-100/20 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-300 focus:outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-slate-200">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full rounded-xl border border-cyan-100/20 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-300 focus:outline-none"
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
                                className="w-full rounded-xl border border-cyan-100/20 bg-slate-900 px-4 py-3 text-sm text-white focus:border-cyan-300 focus:outline-none"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="student">Student</option>
                                <option value="TEACHER">Teacher</option>
                            </select>
                        </div>

                        <div className="form-control mt-6">
                            <button type="submit" className="inline-flex w-full items-center justify-center rounded-xl bg-cyan-400 px-4 py-3 text-sm font-bold uppercase tracking-wide text-slate-900 transition hover:bg-cyan-300">
                                Register
                            </button>

                        </div>
                        <div className="mt-4 text-center">
                            <p className="text-slate-300">
                                Already have an account?{" "}
                                <a href="/login" className="font-semibold text-cyan-300 transition hover:text-cyan-200">
                                    Login here
                                </a>
                            </p>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default Register;