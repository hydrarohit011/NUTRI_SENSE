import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Signup() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    goal: 'Balanced Diet', age: '', weight: '', height: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const calculatePasswordStrength = (pass) => {
    if (pass.length === 0) return 0;
    let strength = 0;
    if (pass.length > 5) strength += 25;
    if (pass.length > 7) strength += 25;
    if (/[A-Z]/.test(pass)) strength += 25;
    if (/[0-9]/.test(pass)) strength += 25;
    return strength;
  };

  const strength = calculatePasswordStrength(formData.password);
  const strengthColor = strength < 50 ? 'bg-red-500' : strength < 75 ? 'bg-yellow-500' : 'bg-primary';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (strength < 50) {
      setError('Password is too weak');
      return;
    }
    if (!formData.name || !formData.email || !formData.weight || !formData.height) {
      setError('Please fill out all required fields');
      return;
    }

    setIsSubmitting(true);
    await signup({
      name: formData.name,
      email: formData.email,
      goal: formData.goal,
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      age: parseInt(formData.age),
    });
    setIsSubmitting(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-dark-bg text-gray-100 overflow-y-auto">
      <motion.div 
        className="glass-card w-full max-w-2xl p-8 my-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">🌱</div>
          <h2 className="text-3xl font-bold">Create your account</h2>
          <p className="text-gray-400 mt-2">Let's personalize your NutriSense experience</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="p-3 bg-red-500/10 border border-red-500/50 text-red-500 rounded-xl text-center text-sm">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-dark-bg/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="John Doe"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-dark-bg/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="john@example.com"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full bg-dark-bg/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="••••••••"/>
                <div className="w-full bg-dark-bg h-1.5 rounded-full mt-2 overflow-hidden">
                  <motion.div className={`h-full ${strengthColor}`} initial={{ width: 0 }} animate={{ width: `${strength}%` }} transition={{ duration: 0.3 }} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Confirm Password</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full bg-dark-bg/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="••••••••"/>
              </div>
            </div>

            {/* Health Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Primary Goal</label>
                <select name="goal" value={formData.goal} onChange={handleChange} className="w-full bg-dark-bg/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-white appearance-none">
                  <option value="Weight Loss">Weight Loss</option>
                  <option value="Muscle Gain">Muscle Gain</option>
                  <option value="Balanced Diet">Balanced Diet</option>
                  <option value="Diabetes Management">Diabetes Management</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Age</label>
                  <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full bg-dark-bg/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="25"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Weight (kg)</label>
                  <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="w-full bg-dark-bg/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="70"/>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Height (cm)</label>
                <input type="number" name="height" value={formData.height} onChange={handleChange} className="w-full bg-dark-bg/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="175"/>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-all transform active:scale-95 disabled:opacity-70 mt-8"
          >
            {isSubmitting ? 'Creating profile...' : 'Complete Signup'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account? <Link to="/login" className="text-primary hover:text-primary-dark font-semibold">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Signup;
