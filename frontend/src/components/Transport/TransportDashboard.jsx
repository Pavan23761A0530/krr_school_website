import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import { Loader2, Navigation, Clock, MapPin, User, Phone, CheckCircle2, X } from 'lucide-react';

import TransportStats from './TransportStats';
import TransportSearch from './TransportSearch';
import TransportMap from './TransportMap';
import BusRouteCards from './BusRouteCards';

const TransportDashboard = () => {
  const [stats, setStats] = useState(null);
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [pickupPoints, setPickupPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [nearestInfo, setNearestInfo] = useState(null);
  const [findingRoute, setFindingRoute] = useState(false);
  const [selectedRouteId, setSelectedRouteId] = useState(null);

  const schoolLocation = { lat: 17.3850, lng: 78.4867 };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/transport/dashboard');
      if (response.data.success) {
        setStats(response.data.stats);
        setBuses(response.data.buses);
        setRoutes(response.data.routes);
        setPickupPoints(response.data.pickupPoints);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load transport data');
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = async (location) => {
    const lat = parseFloat(location.lat);
    const lng = parseFloat(location.lon);
    
    setSearchedLocation({
      name: location.display_name,
      lat,
      lng
    });

    setFindingRoute(true);
    try {
      const response = await axios.post('http://localhost:5000/api/transport/find-nearest', { lat, lng });
      if (response.data.success) {
        setNearestInfo(response.data);
        setSelectedRouteId(response.data.nearestPoint.route._id);
        toast.success('Found nearest transport route!');
      }
    } catch (error) {
      console.error('Error finding nearest transport:', error);
      toast.error('No routes found near your location');
      setNearestInfo(null);
    } finally {
      setFindingRoute(false);
    }
  };

  const handlePickupHere = async () => {
    if (!nearestInfo || !searchedLocation) return;

    const promise = axios.post('http://localhost:5000/api/transport/assign', {
      studentName: 'Guest User', // In a real app, this would be the logged-in student
      location: searchedLocation,
      pickupPointId: nearestInfo.nearestPoint._id,
      routeId: nearestInfo.nearestPoint.route._id,
      busId: nearestInfo.nearestPoint.route.bus._id
    });

    toast.promise(promise, {
      loading: 'Assigning transport...',
      success: 'Successfully assigned to route!',
      error: 'Failed to assign transport. Please try again.'
    });

    try {
      await promise;
      fetchDashboardData(); // Refresh stats and seat counts
      setNearestInfo(null);
      setSearchedLocation(null);
    } catch (error) {
      console.error('Assignment error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f1c]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400 font-medium">Loading Smart Transport System...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
          >
            Smart Transport Search
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Find the nearest bus route and pickup point dynamically
          </motion.p>
        </div>

        {/* Stats Section */}
        <TransportStats stats={stats} />

        {/* Search Section */}
        <TransportSearch onLocationSelect={handleLocationSelect} />

        {/* Main Content: Map and Info Overlay */}
        <div className="relative">
          <TransportMap 
            schoolLocation={schoolLocation}
            routes={routes}
            buses={buses}
            pickupPoints={pickupPoints}
            searchedLocation={searchedLocation}
            selectedRouteId={selectedRouteId}
          />

          {/* Nearest Info Card Overlay */}
          <AnimatePresence>
            {nearestInfo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: 20 }}
                className="absolute top-6 right-6 z-20 w-full max-w-sm bg-slate-900/90 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Nearest Route Found</h3>
                    <p className="text-blue-400 text-sm font-medium">{nearestInfo.nearestPoint.route.routeName}</p>
                  </div>
                  <button 
                    onClick={() => setNearestInfo(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 text-gray-300">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Navigation className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Nearest Pickup Point</p>
                      <p className="font-medium">{nearestInfo.nearestPoint.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-gray-300">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <Clock className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Estimated Pickup Time</p>
                      <p className="font-medium">{nearestInfo.nearestPoint.route.timing.pickup}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-gray-300">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <User className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Driver Details</p>
                      <p className="font-medium">{nearestInfo.nearestPoint.route.bus.driverName}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <Phone className="w-3 h-3" />
                        <span>{nearestInfo.nearestPoint.route.bus.driverContact}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Dist. to School</p>
                      <p className="font-bold text-white">{nearestInfo.distanceToSchool.toFixed(1)} km</p>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Seats Available</p>
                      <p className="font-bold text-green-400">{nearestInfo.nearestPoint.route.bus.availableSeats}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={handlePickupHere}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Pickup Here
                  </button>
                  <button 
                    onClick={() => setNearestInfo(null)}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading Overlay for Finding Route */}
          {findingRoute && (
            <div className="absolute inset-0 z-30 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center rounded-3xl">
              <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl text-center shadow-2xl">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Analyzing Routes...</h3>
                <p className="text-gray-400">Finding the most efficient pickup point for you</p>
              </div>
            </div>
          )}
        </div>

        {/* Bus Route Cards Section */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">All Bus Routes</h2>
            <div className="flex gap-2">
              <span className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-xs">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Live Tracking Active
              </span>
            </div>
          </div>
          <BusRouteCards routes={routes} />
        </div>
      </div>
    </div>
  );
};

export default TransportDashboard;
