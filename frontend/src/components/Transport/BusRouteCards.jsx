import React from 'react';
import { motion } from 'framer-motion';
import { Bus, User, Clock, MapPin, Users } from 'lucide-react';
import MiniRouteMap from './MiniRouteMap';

const BusRouteCards = ({ routes }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
      {routes.map((route, index) => (
        <motion.div
          key={route._id}
          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl flex flex-col md:flex-row gap-6 hover:bg-white/10 transition-all group"
        >
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-500/30">
                {route.routeNumber}
              </span>
              <div className="flex items-center gap-1 text-gray-400 text-sm">
                <Clock className="w-4 h-4" />
                <span>{route.timing.pickup} - {route.timing.drop}</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
              {route.routeName}
            </h3>

            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Bus className="w-4 h-4 text-blue-400" />
                <span>{route.bus?.busNumber}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <User className="w-4 h-4 text-blue-400" />
                <span>{route.bus?.driverName}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Users className="w-4 h-4 text-blue-400" />
                <span>{route.bus?.availableSeats} Seats left</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm col-span-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="line-clamp-1">{route.villagesCovered.join(', ')}</span>
              </div>
            </div>
          </div>

          <MiniRouteMap 
            path={route.path} 
            busLocation={route.bus?.currentLocation} 
          />
        </motion.div>
      ))}
    </div>
  );
};

export default BusRouteCards;
