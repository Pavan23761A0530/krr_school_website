import React from 'react';
import { motion } from 'framer-motion';
import {
  Bus,
  User,
  Clock,
  MapPin,
  ChevronRight,
  IndianRupee,
  Timer,
  Info
} from 'lucide-react';

import MiniRouteMap from './MiniRouteMap';

const BusRouteCards = ({ routes, pickupPoints, onBookRoute }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6 xl:gap-8 mt-12 auto-rows-fr">
      {routes.map((route, index) => {
        const routeCheckpoints = (pickupPoints || []).filter(
          (p) => p.route?._id === route._id || p.route === route._id
        );

        return (
          <motion.div
            key={route._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] h-full flex flex-col justify-between hover:bg-white/10 transition-all group relative overflow-hidden"
          >
            {/* Background Glow */}
            <div
              className="absolute -top-24 -right-24 w-48 h-48 blur-[80px] group-hover:opacity-30 transition-all opacity-10"
              style={{
                backgroundColor: route.color || '#3b82f6'
              }}
            />

            <div className="flex flex-col gap-6 relative z-10 h-full">
              
              {/* TOP SECTION */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-white px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-lg"
                      style={{
                        backgroundColor: route.color || '#3b82f6'
                      }}
                    >
                      {route.routeNumber}
                    </span>

                    <div className="flex items-center gap-1 text-gray-400 text-xs font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      {route.timing?.pickup}
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-white leading-tight group-hover:text-blue-400 transition-colors">
                    {route.routeName}
                  </h3>
                </div>

                {/* Mini Map */}
                <div className="w-[90px] h-[90px] overflow-hidden rounded-2xl border border-white/10 shrink-0">
                  <MiniRouteMap
                    path={route.path}
                    busLocation={route.bus?.currentLocation}
                    routeColor={route.color}
                  />
                </div>
              </div>

              {/* PRICE + TIME */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 text-yellow-400 font-black bg-yellow-500/10 px-4 py-2 rounded-xl border border-yellow-500/20 text-xs">
                  <IndianRupee className="w-3.5 h-3.5" />
                  <span>{route.fee?.toLocaleString()} / Year</span>
                </div>

                <div className="flex items-center gap-2 text-blue-400 font-black bg-blue-500/10 px-4 py-2 rounded-xl border border-blue-500/20 text-xs">
                  <Timer className="w-3.5 h-3.5" />
                  <span>{route.estimatedTime || 'N/A'}</span>
                </div>

                <div className="flex items-center gap-2 text-green-400 font-black bg-green-500/10 px-4 py-2 rounded-xl border border-green-500/20 text-xs">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  {route.bus?.availableSeats || 0} Seats Left
                </div>
              </div>

              {/* CHECKPOINTS */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] font-black text-gray-400 flex items-center gap-2 uppercase tracking-widest">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    Key Checkpoints
                  </p>

                  <span className="text-[9px] font-black bg-white/5 px-2 py-1 rounded-lg text-gray-500 uppercase">
                    {routeCheckpoints.length} Stops
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {routeCheckpoints.slice(0, 3).map((cp) => (
                    <div
                      key={cp._id}
                      className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-2xl text-[10px] font-bold text-gray-300"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          backgroundColor: route.color || '#3b82f6'
                        }}
                      />

                      {cp.name}
                    </div>
                  ))}

                  {routeCheckpoints.length > 3 && (
                    <span className="text-[10px] font-bold text-gray-500 self-center">
                      +{routeCheckpoints.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* BUS + DRIVER */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all">
                  <div className="p-2.5 bg-blue-500/20 rounded-2xl">
                    <Bus className="w-5 h-5 text-blue-400" />
                  </div>

                  <div>
                    <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest">
                      Bus No
                    </p>

                    <p className="text-sm font-black text-white">
                      {route.bus?.busNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all">
                  <div className="p-2.5 bg-purple-500/20 rounded-2xl">
                    <User className="w-5 h-5 text-purple-400" />
                  </div>

                  <div>
                    <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest">
                      Driver
                    </p>

                    <p className="text-sm font-black text-white">
                      {route.bus?.driverName}
                    </p>
                  </div>
                </div>
              </div>

              {/* VILLAGES */}
              <div>
                <p className="text-[10px] text-gray-600 font-bold italic leading-relaxed">
                  Villages Covered:
                </p>

                <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                  {route.villagesCovered?.join(' • ')}
                </p>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <button 
                  onClick={() => onBookRoute && onBookRoute(route)}
                  className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transform active:scale-95"
                >
                  Book This Route
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default BusRouteCards;