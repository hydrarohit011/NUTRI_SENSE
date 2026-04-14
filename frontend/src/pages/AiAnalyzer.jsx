import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { SparklesIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

function AiAnalyzer() {
  const [input, setInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setAnalyzing(true);
    setResult(null);

    // Mock processing delay overhead
    setTimeout(() => {
      // Mock heuristic analysis based on keywords
      const lower = input.toLowerCase();
      let score = 75;
      let breakdown = { cals: 650, prot: 30, carbs: 70, fats: 25 };
      let alt = 'Try swapping white rice with quinoa to lower glycemic impact.';
      
      if (lower.includes('salad') || lower.includes('spinach') || lower.includes('chicken')) {
        score = 92;
        breakdown = { cals: 350, prot: 45, carbs: 15, fats: 12 };
        alt = 'Excellent meal! Consider adding walnuts for healthy Omega-3s.';
      } else if (lower.includes('burger') || lower.includes('pizza') || lower.includes('fries')) {
        score = 40;
        breakdown = { cals: 1200, prot: 25, carbs: 120, fats: 65 };
        alt = 'Opt for a grilled chicken sandwich or a thin-crust pizza packed with veggies.';
      }

      setResult({ score, breakdown, alt });
      setAnalyzing(false);
    }, 2500);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto w-full min-h-screen">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <SparklesIcon className="w-8 h-8 text-primary"/> AI Smart Plate
          </h2>
          <p className="text-gray-400 mt-2">Describe what you ate, and our AI will break it down.</p>
        </div>
      </div>

      <motion.div className="glass-card p-6 border-white/10 relative overflow-hidden" 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      >
        <form onSubmit={handleAnalyze} className="relative z-10 space-y-4">
          <textarea 
            className="w-full bg-dark-bg/80 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary resize-none h-32 transition-colors"
            placeholder="e.g. I had a double cheeseburger with medium fries and a diet coke..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
          <div className="flex justify-end">
            <button 
              type="submit" 
              disabled={analyzing || !input.trim()}
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {analyzing ? (
                <> <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Analyzing </>
              ) : 'Analyze Meal'}
            </button>
          </div>
        </form>
      </motion.div>

      <AnimatePresence>
        {result && (
          <motion.div 
            initial={{ opacity: 0, height: 0, y: 20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Health Score */}
            <div className="glass-card p-6 flex flex-col items-center justify-center col-span-1 border-white/10 bg-gradient-to-t from-primary/5 to-transparent">
              <h3 className="text-gray-400 font-medium mb-4">Health Score</h3>
              <div className="text-6xl font-black text-primary mb-2">{result.score}</div>
              <span className="text-sm bg-primary/20 text-primary px-3 py-1 rounded-full flex items-center gap-1">
                {result.score > 80 ? <CheckCircleIcon className="w-4 h-4"/> : <ExclamationTriangleIcon className="w-4 h-4"/>}
                {result.score > 80 ? 'Optimal' : result.score > 50 ? 'Moderate' : 'Needs Improvement'}
              </span>
            </div>

            {/* Macro Breakdown */}
            <div className="glass-card p-6 col-span-1 md:col-span-2 border-white/10 flex flex-col justify-center">
              <h3 className="text-gray-400 font-medium mb-6">Estimated Nutritional Breakdown</h3>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-white mb-1">{result.breakdown.cals}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Calories</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-400 mb-1">{result.breakdown.prot}g</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Protein</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-400 mb-1">{result.breakdown.carbs}g</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Carbs</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-400 mb-1">{result.breakdown.fats}g</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Fats</p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-primary/10 border border-primary/20 rounded-xl flex items-start gap-3">
                <SparklesIcon className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-primary-light font-semibold mb-1">Smart Suggestion</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">{result.alt}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AiAnalyzer;
