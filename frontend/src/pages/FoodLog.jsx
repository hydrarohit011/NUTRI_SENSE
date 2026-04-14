import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaceSmileIcon, FaceFrownIcon, ExclamationCircleIcon, PlusIcon } from '@heroicons/react/24/outline';

function FoodLog() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [logging, setLogging] = useState(false);
  const [history, setHistory] = useState([
    { id: 1, time: '08:30 AM', name: 'Oatmeal & Berries', cals: 320, symptom: 'energetic' }
  ]);

  const searchFood = async (e) => {
    e.preventDefault();
    if(!query) return;
    setLogging(true);
    try {
      const res = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1&page_size=3`);
      const data = await res.json();
      setResults(data.products || []);
    } catch (err) { 
      console.error(err); 
    } finally { setLogging(false); }
  };

  const addFood = (product, symptom) => {
    setHistory([...history, {
      id: Date.now(),
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      name: product.product_name || 'Generic Food',
      cals: product.nutriments?.energy_kcal || 0,
      symptom
    }]);
    setResults([]);
    setQuery('');
  };

  // eslint-disable-next-line no-unused-vars
  const SymptomButton = ({ icon: Icon, label, color, activeSymptom, setSymptom }) => {
    const isActive = activeSymptom === label;
    return (
      <button 
        type="button"
        onClick={() => setSymptom(isActive ? null : label)}
        className={`flex flex-col items-center p-3 rounded-xl transition-all ${isActive ? 'bg-'+color+'/20 border-'+color+'/50' : 'bg-dark-surface hover:bg-white/5'} border border-white/5 w-24`}
      >
        <Icon className={`w-6 h-6 mb-1 ${isActive ? 'text-'+color : 'text-gray-400'}`} />
        <span className={`text-xs ${isActive ? 'text-'+color : 'text-gray-500'}`}>{label}</span>
      </button>
    );
  };

  return (
    <div className="p-8 max-w-6xl mx-auto w-full min-h-screen pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Logger Side */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Log Your Meal</h2>
          <div className="glass-card p-6 mb-8">
            <form onSubmit={searchFood} className="flex gap-4">
              <input 
                type="text" 
                placeholder="Search food dataset..."
                className="flex-1 bg-dark-bg/80 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button disabled={logging} type="submit" className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-primary/20">
                {logging ? '...' : 'Search'}
              </button>
            </form>
          </div>

          <div className="space-y-4">
            {results.map((product) => (
              <FoodResultCard key={product.id} product={product} onAdd={addFood} />
            ))}
          </div>
        </div>

        {/* Timeline Side */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-400">Today's Timeline</h2>
          <div className="relative border-l border-white/10 ml-4 space-y-8 pl-8 py-2">
            {history.map((entry) => (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={entry.id} className="relative">
                <div className="absolute -left-10 mt-1.5 w-4 h-4 rounded-full bg-primary ring-4 ring-dark-bg"></div>
                <div className="glass-card p-5 border-white/5">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-lg">{entry.name}</h4>
                    <span className="text-sm font-semibold text-primary-light">{entry.cals} kcal</span>
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <span className="text-xs text-gray-500 font-medium bg-dark-bg px-2 py-1 rounded-md">{entry.time}</span>
                    {entry.symptom && (
                      <span className="text-xs text-gray-300 font-medium flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md">
                        Feeling: <span className="capitalize text-white">{entry.symptom}</span>
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// Subcomponent to handle individual result state natively
const FoodResultCard = ({ product, onAdd }) => {
  const [symptom, setSymptom] = useState(null);
  
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4 flex flex-col gap-4 border-white/10">
      <div className="flex items-center gap-4">
         {product.image_front_thumb_url ? (
            <img src={product.image_front_thumb_url} className="w-14 h-14 object-cover rounded-lg" />
          ) : <div className="w-14 h-14 bg-dark-bg rounded-lg flex items-center justify-center text-gray-600 text-xs">No Img</div>}
          <div className="flex-1">
            <h4 className="font-bold text-md leading-tight">{product.product_name}</h4>
            <p className="text-xs text-gray-400 mt-1">{product.nutriments?.energy_kcal || 0} kcal</p>
          </div>
      </div>
      
      <div className="pt-4 border-t border-white/5">
        <p className="text-xs text-gray-400 mb-2 font-medium">How did you feel after eating this?</p>
        <div className="flex gap-2 mb-4">
           <button onClick={()=>setSymptom(symptom === 'energetic' ? null : 'energetic')} className={`flex-1 py-2 rounded-lg text-xs font-semibold ${symptom==='energetic' ? 'bg-primary/20 text-primary border border-primary/50' : 'bg-dark-bg text-gray-400 border border-white/5'}`}>Energetic</button>
           <button onClick={()=>setSymptom(symptom === 'tired' ? null : 'tired')} className={`flex-1 py-2 rounded-lg text-xs font-semibold ${symptom==='tired' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50' : 'bg-dark-bg text-gray-400 border border-white/5'}`}>Tired</button>
           <button onClick={()=>setSymptom(symptom === 'bloated' ? null : 'bloated')} className={`flex-1 py-2 rounded-lg text-xs font-semibold ${symptom==='bloated' ? 'bg-red-500/20 text-red-500 border border-red-500/50' : 'bg-dark-bg text-gray-400 border border-white/5'}`}>Bloated</button>
        </div>
        <button onClick={() => onAdd(product, symptom)} className="w-full bg-white/5 hover:bg-primary text-white hover:text-dark-bg py-2 rounded-lg font-bold transition-colors flex justify-center items-center gap-2">
          <PlusIcon className="w-4 h-4"/> Add to Timeline
        </button>
      </div>
    </motion.div>
  );
};

export default FoodLog;
