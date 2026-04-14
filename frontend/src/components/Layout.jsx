import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  HomeIcon, 
  MagnifyingGlassCircleIcon, 
  CalendarDaysIcon, 
  ChartBarIcon, 
  UserCircleIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
    { name: 'Log Food', path: '/log', icon: MagnifyingGlassCircleIcon },
    { name: 'Meal Planner', path: '/planner', icon: CalendarDaysIcon },
    { name: 'Progress', path: '/progress', icon: ChartBarIcon },
    { name: 'AI Analyzer', path: '/ai', icon: UserCircleIcon },
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-gray-100 flex pb-16 md:pb-0">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 glass border-r border-white/5 border-l-0 border-y-0 h-screen sticky top-0">
        <div className="p-6 pb-2">
          <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
            <span className="text-primary text-3xl">🌱</span>
            NutriSense
          </h1>
        </div>
        
        <div className="px-6 py-4 mb-4">
          <p className="text-sm text-gray-400">Welcome back,</p>
          <p className="font-semibold text-lg text-white truncate">{user?.name || 'User'}</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative ${
                  isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-primary/10 rounded-xl"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon className="w-6 h-6 relative z-10" />
                  <span className="font-medium relative z-10">{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors"
          >
            <ArrowRightOnRectangleIcon className="w-6 h-6" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-white/5 pb-safe z-50">
        <div className="flex justify-around items-center h-16">
          {navItems.slice(0, 4).map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full space-y-1 ${
                  isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-200'
                }`
              }
            >
              <item.icon className="w-6 h-6" />
              <span className="text-[10px] font-medium">{item.name}</span>
            </NavLink>
          ))}
        </div>
      </nav>

    </div>
  );
}

export default Layout;
