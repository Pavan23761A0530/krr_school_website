import React from 'react';
import { motion } from 'framer-motion';
import { Bus, MapPin, Users, Route } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl flex items-center gap-4"
  >
    <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
      <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
    </div>
    <div>
      <p className="text-gray-400 text-sm font-medium">{label}</p>
      <h3 className="text-2xl font-bold text-white">{value}</h3>
    </div>
  </motion.div>
);

const TransportStats = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      <StatCard 
        icon={Bus} 
        label="Total Buses" 
        value={stats.totalBuses} 
        color="bg-blue-500" 
      />
      <StatCard 
        icon={Route} 
        label="Active Routes" 
        value={stats.activeRoutes} 
        color="bg-green-500" 
      />
      <StatCard 
        icon={Users} 
        label="Available Seats" 
        value={stats.availableSeats} 
        color="bg-yellow-500" 
      />
      <StatCard 
        icon={MapPin} 
        label="Pickup Points" 
        value={stats.totalPickupPoints} 
        color="bg-purple-500" 
      />
      <StatCard 
        icon={Users} 
        label="Transport Users" 
        value={stats.studentsUsingTransport} 
        color="bg-pink-500" 
      />
    </div>
  );
};

export default TransportStats;
