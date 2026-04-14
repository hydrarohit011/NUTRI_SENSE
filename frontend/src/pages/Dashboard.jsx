import React from 'react';
import { useAuth } from '../context/AuthContext';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // BMI Calculation
  let bmi = 0;
  let bmiStatus = "Unknown";
  let bmiColor = "text-gray-400";
  if (user?.height && user?.weight) {
    const heightInMeters = user.height / 100;
    bmi = (user.weight / (heightInMeters * heightInMeters)).toFixed(1);
    if (bmi < 18.5) { bmiStatus = "Underweight"; bmiColor = "text-blue-400"; }
    else if (bmi < 25) { bmiStatus = "Normal"; bmiColor = "text-primary"; }
    else if (bmi < 30) { bmiStatus = "Overweight"; bmiColor = "text-yellow-400"; }
    else { bmiStatus = "Obese"; bmiColor = "text-red-500"; }
  }

  // Mock Calorie Ring Logic
  const goalCals = 2000;
  const consumedCals = 1450;
  const percentage = (consumedCals / goalCals) * 100;
  const strokeDasharray = 2 * Math.PI * 45; // r=45
  const strokeDashoffset = strokeDasharray - (percentage / 100) * strokeDasharray;

  // Mock Water Tracker
  const [glasses, setGlasses] = React.useState(3);

  return (
    <div className="p-8 pb-32 max-w-6xl mx-auto w-full relative min-h-screen">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h2 className="text-3xl font-bold mb-2">Hello, {user?.name || 'Friend'} 👋</h2>
        <p className="text-gray-400 mb-8">Here's your summary for today.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Calorie Goal Ring */}
          <div className="col-span-1 glass-card p-6 flex flex-col items-center justify-center relative">
            <h3 className="text-lg font-semibold absolute top-6 left-6">Daily Calories</h3>
            <svg width="120" height="120" viewBox="0 0 100 100" className="mt-8 transform -rotate-90">
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8"/>
              <motion.circle 
                cx="50" cy="50" r="45" fill="none" stroke="#00C896" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={strokeDasharray}
                initial={{ strokeDashoffset: strokeDasharray }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute mt-8 text-center flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">{consumedCals}</span>
              <span className="text-xs text-gray-400">/ {goalCals} kcal</span>
            </div>
            <p className="mt-4 text-sm text-gray-400 text-center">{(goalCals - consumedCals)} kcal remaining</p>
          </div>

          {/* BMI Widget */}
          <div className="col-span-1 glass-card p-6 flex flex-col justify-between">
            <h3 className="text-lg font-semibold">Your BMI</h3>
            <div className="flex items-end gap-2 mt-4">
              <span className="text-5xl font-black">{bmi || '--'}</span>
              <span className={`text-lg font-medium mb-1 ${bmiColor}`}>{bmiStatus}</span>
            </div>
            <div className="w-full h-2 bg-dark-bg mt-6 rounded-full overflow-hidden flex">
              <div className="w-1/4 h-full bg-blue-400"></div>
              <div className="w-1/4 h-full bg-primary relative">
                {bmiStatus === 'Normal' && <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-white shadow-[0_0_8px_white]"></div>}
              </div>
              <div className="w-1/4 h-full bg-yellow-400"></div>
              <div className="w-1/4 h-full bg-red-500"></div>
            </div>
            <p className="text-xs text-gray-400 mt-2">Based on {user?.weight || '--'}kg / {user?.height || '--'}cm</p>
          </div>

          {/* Streak & Water */}
          <div className="col-span-1 flex flex-col gap-6">
            <div className="glass-card p-6 bg-gradient-to-br from-orange-500/20 to-transparent border-orange-500/30 text-center">
              <div className="text-4xl mb-2">🔥</div>
              <h3 className="text-lg font-semibold text-orange-400">5 Day Streak</h3>
              <p className="text-sm text-gray-300">You're on fire! Keep logging meals.</p>
            </div>

            <div className="glass-card p-6 text-center flex-1 flex flex-col justify-between">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Hydration</h3>
              <p className="text-sm text-gray-400 mb-4">{glasses} / 8 glasses</p>
              <div className="flex justify-center gap-1">
                {[...Array(8)].map((_, i) => (
                  <motion.button 
                    key={i}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setGlasses(i + 1)}
                    className={`w-6 h-8 rounded-sm transition-colors ${i < glasses ? 'bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]' : 'bg-dark-bg border border-white/10'}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </motion.div>

      {/* Floating Action Button */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/log')}
        className="fixed bottom-24 md:bottom-12 right-6 md:right-12 w-16 h-16 bg-primary text-white rounded-full shadow-lg shadow-primary/40 flex items-center justify-center hover:bg-primary-dark transition-colors z-40"
      >
        <PlusIcon className="w-8 h-8" />
      </motion.button>
    </div>
  );
}

export default Dashboard;
