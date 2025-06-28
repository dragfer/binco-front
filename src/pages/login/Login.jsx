import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import './login.scss';
import Navbar from '../../components/navbar/Navbar';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/user/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      console.log('Login attempt with:', { username, password });
      const response = await fetch('http://192.168.20.233:5000/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const res = await response.json();
      if (!response.ok) {
        throw new Error(res.message || 'Login failed');
      }
      // On successful login, save the accessToken from the response cookie
      const token = res.accessToken;
      localStorage.setItem('accessToken', token);
      
      navigate(redirectTo);
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-card">
          <h2>Welcome Back</h2>
          <p className="subtitle">Sign in to continue to your account</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            
            <div className="forgot-password">
              <a href="#forgot">Forgot password?</a>
            </div>
            
            <button type="submit" className="login-button">
              Sign In
            </button>
            
            <p className="signup-link">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
            {redirectTo && redirectTo !== '/user/dashboard' && (
              <p className="redirect-notice">
                You'll be redirected back to your previous page after login.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;