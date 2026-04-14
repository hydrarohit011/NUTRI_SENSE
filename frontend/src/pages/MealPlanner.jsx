import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { CalendarIcon, FireIcon } from '@heroicons/react/24/outline';

function MealPlanner() {
  const [activeTab, setActiveTab] = useState('Today');
  
  const tabs = ['Yesterday', 'Today', 'Tomorrow'];

  const meals = {
    Breakfast: [
      { name: 'Protein Oatmeal', cals: 350, prot: 25, highlight: true },
      { name: 'Greek Yogurt & Berries', cals: 200, prot: 15, highlight: false },
    ],
    Lunch: [
      { name: 'Grilled Chicken Salad', cals: 450, prot: 40, highlight: true },
    ],
    Dinner: [
      { name: 'Salmon & Quinoa', cals: 550, prot: 35, highlight: true },
      { name: 'Steamed Broccoli', cals: 50, prot: 4, highlight: false },
    ],
    Snacks: [
      { name: 'Almonds (1 oz)', cals: 160, prot: 6, highlight: false }
    ]
  };

  return (
    <div className="p-8 max-w-5xl mx-auto w-full min-h-screen pb-32">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <CalendarIcon className="w-8 h-8 text-primary"/> Meal Planner
          </h2>
          <p className="text-gray-400 mt-2">Your personalized nutrition roadmap.</p>
        </div>
      </div>

      <div className="flex border-b border-white/10 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-4 font-semibold transition-colors relative ${activeTab === tab ? 'text-primary' : 'text-gray-500 hover:text-white'}`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {Object.entries(meals).map(([mealType, items]) => (
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} key={mealType} className="glass-card overflow-hidden border-white/5">
            <div className="bg-white/5 px-6 py-4 flex justify-between items-center border-b border-white/5">
              <h3 className="font-bold text-lg text-white">{mealType}</h3>
              <button className="text-sm font-semibold text-primary hover:text-primary-light transition-colors">+ Add Item</button>
            </div>
            <div className="p-2">
              {items.map((item, idx) => (
                <div key={idx} className={`p-4 mx-4 my-2 rounded-xl flex justify-between items-center transition-colors group ${item.highlight ? 'bg-primary/5 hover:bg-primary/10 border border-primary/20' : 'hover:bg-white/5'}`}>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-primary transition-colors">{item.name}</h4>
                    <div className="flex gap-4 mt-1">
                      <span className="text-xs text-gray-400 flex items-center gap-1"><FireIcon className="w-3 h-3"/> {item.cals} kcal</span>
                      <span className="text-xs text-blue-400">{item.prot}g protein</span>
                    </div>
                  </div>
                  <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:bg-white/10 hover:text-white transition-colors">
                    ...
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default MealPlanner;
