/* eslint-disable react-hooks/purity */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const BackgroundParticles = () => {
  const particles = React.useMemo(() => [...Array(20)].map(() => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    animY: Math.random() * -500,
    duration: Math.random() * 5 + 5
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/30 rounded-full"
          initial={{ x: p.x, y: p.y }}
          animate={{ y: [null, p.animY], opacity: [0, 1, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
};

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Email is required');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsAuthenticating(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="min-h-screen flex text-gray-100 bg-dark-bg relative overflow-hidden">
      <BackgroundParticles />
      
      {/* Left side: Tagline & Branding */}
      <div className="hidden lg:flex flex-col flex-1 justify-center px-24 relative z-10 bg-gradient-to-br from-primary-dark/20 to-transparent">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-6xl mb-6">🌱</div>
          <h1 className="text-6xl font-black mb-6 leading-tight">
            Nourish your<br/>
            <span className="text-primary">potential.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-md">
            Join thousands of others achieving their health goals with smart, data-driven food choices.
          </p>
        </motion.div>
      </div>

      {/* Right side: Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <motion.div 
          className="glass-card w-full max-w-md p-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
          <p className="text-gray-400 mb-8">Please enter your details to sign in.</p>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Email Field */}
            <div className="relative group">
              <input
                type="email"
                id="email"
                className={`w-full bg-dark-bg/50 border ${error.includes('Email') ? 'border-red-500' : 'border-white/10 group-focus-within:border-primary'} rounded-xl px-4 pt-6 pb-2 text-white placeholder-transparent focus:outline-none transition-colors peer`}
                placeholder="Name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email" className="absolute left-4 top-2 text-xs text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary">
                Email Address
              </label>
            </div>

            {/* Password Field */}
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className={`w-full bg-dark-bg/50 border ${error.includes('Password') ? 'border-red-500' : 'border-white/10 group-focus-within:border-primary'} rounded-xl px-4 pt-6 pb-2 text-white placeholder-transparent focus:outline-none transition-colors peer`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password" className="absolute left-4 top-2 text-xs text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary">
                Password
              </label>
              <button 
                type="button" 
                className="absolute right-4 top-4 text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeSlashIcon className="w-5 h-5"/> : <EyeIcon className="w-5 h-5"/>}
              </button>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-600 bg-dark-bg text-primary focus:ring-primary focus:ring-offset-dark-bg"/>
                <span className="text-gray-400">Remember for 30 days</span>
              </label>
              <a href="#" className="text-primary hover:text-primary-dark transition-colors">Forgot password?</a>
            </div>

            <button 
              type="submit" 
              disabled={isAuthenticating}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-all transform active:scale-95 disabled:opacity-70 flex justify-center items-center"
            >
              {isAuthenticating ? (
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : "Sign in"}
            </button>

            <button 
              type="button"
              className="w-full bg-dark-bg hover:bg-dark-surface2 border border-white/10 text-white font-medium py-3 rounded-xl transition-all flex justify-center items-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          </form>

          <p className="mt-8 text-center text-gray-400">
            Don't have an account? <Link to="/signup" className="text-primary hover:text-primary-dark font-semibold">Sign up</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
