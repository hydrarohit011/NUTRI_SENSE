import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-dark-bg">
      <div className="max-w-3xl space-y-8">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
          Eat Smart, <span className="text-primary">Live Better</span>
        </h1>
        <p className="text-xl text-gray-400">
          NutriSense is your intelligent companion for making better food choices and achieving your health goals with data-driven insights.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
          <Link to="/log" className="px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg shadow-primary/30">
            Log Your Meal
          </Link>
          <Link to="/dashboard" className="px-8 py-4 bg-dark-surface2 hover:bg-gray-700 text-white rounded-full font-semibold text-lg transition-all border border-gray-700">
            View Dashboard
          </Link>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full text-left">
        <div className="bg-dark-surface p-8 rounded-2xl border border-gray-800 shadow-xl">
          <div className="text-primary-light text-4xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold mb-2">Food Logger</h3>
          <p className="text-gray-400">Search thousands of foods instantly via Open Food Facts and get precise macro breakdowns.</p>
        </div>
        <div className="bg-dark-surface p-8 rounded-2xl border border-gray-800 shadow-xl">
          <div className="text-primary-light text-4xl mb-4">📊</div>
          <h3 className="text-2xl font-bold mb-2">Weekly Insights</h3>
          <p className="text-gray-400">Visualize your eating patterns with beautiful charts to stay aligned with your daily goals.</p>
        </div>
        <div className="bg-dark-surface p-8 rounded-2xl border border-gray-800 shadow-xl">
          <div className="text-primary-light text-4xl mb-4">💡</div>
          <h3 className="text-2xl font-bold mb-2">Smart Suggestions</h3>
          <p className="text-gray-400">Get personalized, healthy alternatives designed to help you build lasting dietary habits.</p>
        </div>
      </div>
    </div>
  );
}

export default Landing;
