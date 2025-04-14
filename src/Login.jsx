import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import Swal from 'sweetalert2';

const Login = () => {
  const { handelLogin, handelGoogleLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    console.log('Login Request Data:', loginData);

    try {
      const response = await fetch('https://your-api.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      console.log('Server Response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      Swal.fire('Success', 'Login successful!', 'success');
      navigate('/');
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await handelGoogleLogin();
      Swal.fire('Success', 'Google login successful!', 'success');
      navigate('/');
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <h1 className="text-5xl font-bold mb-6">Login Now!</h1>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="form-control mt-2">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>

            {/* Forgot Password */}
            <div className="mt-4 text-center">
              <NavLink to="/forgot-password" className="link link-primary">
                Forgot Password?
              </NavLink>
            </div>

            {/* Register Link */}
            <div className="mt-4 text-center">
              <p>
                Don&apos;t have an account?{' '}
                <NavLink to="/register" className="link link-primary">
                  Register here
                </NavLink>
              </p>
            </div>
          </form>

          {/* Google Login */}
          <div className="card-body pt-0">
            <button onClick={handleGoogleLogin} className="btn btn-secondary w-full">
              <i className="fa-brands fa-google mr-2"></i>
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
