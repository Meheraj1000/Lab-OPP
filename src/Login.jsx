import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import Swal from 'sweetalert2';

const Login = () => {
  const { handleLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    console.log('Login Request Data:', loginData);

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      console.log(data)

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      Swal.fire('Success', 'Login successful!', 'success');
      handleLogin(data);
      navigate('/');


    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };


  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 px-4 py-10 sm:px-6 lg:py-14">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 lg:flex-row lg:items-stretch">
        <div className="w-full rounded-3xl border border-cyan-100/20 bg-white/5 p-8 text-white shadow-2xl backdrop-blur-md lg:w-1/2">
          <p className="mb-2 inline-flex rounded-full border border-cyan-200/30 bg-cyan-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
            Welcome Back
          </p>
          <h1 className="mb-4 text-4xl font-black sm:text-5xl">Login Now!</h1>
          <p className="max-w-md text-sm text-slate-300 sm:text-base">
            Continue your quiz journey, join exams, and track your latest performance.
          </p>
        </div>

        <div className="w-full rounded-3xl border border-cyan-100/20 bg-slate-900/70 p-2 shadow-2xl lg:w-1/2">
          <div className="rounded-2xl bg-slate-950/60 p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="card-body">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-slate-200">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full rounded-xl border border-cyan-100/20 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-300 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-slate-200">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full rounded-xl border border-cyan-100/20 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-300 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="form-control mt-2">
              <button type="submit" className="inline-flex w-full items-center justify-center rounded-xl bg-cyan-400 px-4 py-3 text-sm font-bold uppercase tracking-wide text-slate-900 transition hover:bg-cyan-300">
                Login
              </button>
            </div>

            {/* Forgot Password */}
            <div className="mt-4 text-center">
              <NavLink to="/forgot-password" className="text-sm font-semibold text-cyan-300 transition hover:text-cyan-200">
                Forgot Password?
              </NavLink>
            </div>

            {/* Register Link */}
            <div className="mt-4 text-center">
              <p className="text-slate-300">
                Don&apos;t have an account?{' '}
                <NavLink to="/register" className="font-semibold text-cyan-300 transition hover:text-cyan-200">
                  Register here
                </NavLink>
              </p>
            </div>
          </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
