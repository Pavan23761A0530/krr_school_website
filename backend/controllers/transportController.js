const { Bus, Route, PickupPoint, TransportAssignment } = require('../models/Transport');

// Haversine formula to calculate distance between two points in km
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

// @desc    Get all transport data for dashboard
// @route   GET /api/transport/dashboard
exports.getTransportDashboard = async (req, res) => {
  try {
    const buses = await Bus.find();
    const routes = await Route.find().populate('bus');
    const pickupPoints = await PickupPoint.find();
    const assignments = await TransportAssignment.find();

    const stats = {
      totalBuses: buses.length,
      activeRoutes: routes.length,
      availableSeats: buses.reduce((acc, bus) => acc + bus.availableSeats, 0),
      totalPickupPoints: pickupPoints.length,
      studentsUsingTransport: assignments.length
    };

    res.status(200).json({
      success: true,
      stats,
      buses,
      routes,
      pickupPoints
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Find nearest transport options
// @route   POST /api/transport/find-nearest
exports.findNearestTransport = async (req, res) => {
  try {
    const { lat, lng } = req.body;

    if (!lat || !lng) {
      return res.status(400).json({ success: false, message: 'Coordinates are required' });
    }

    const pickupPoints = await PickupPoint.find().populate({
      path: 'route',
      populate: { path: 'bus' }
    });

    if (pickupPoints.length === 0) {
      return res.status(404).json({ success: false, message: 'No pickup points found' });
    }

    // Find the nearest pickup point
    let nearestPoint = null;
    let minDistance = Infinity;

    pickupPoints.forEach(point => {
      const distance = getDistance(lat, lng, point.location.lat, point.location.lng);
      if (distance < minDistance) {
        minDistance = distance;
        nearestPoint = point;
      }
    });

    // School location (Hardcoded for this example, usually stored in config)
    const schoolLocation = { lat: 17.3850, lng: 78.4867 }; // Example: Hyderabad
    const distanceToSchool = getDistance(lat, lng, schoolLocation.lat, schoolLocation.lng);

    res.status(200).json({
      success: true,
      nearestPoint,
      distanceFromSearch: minDistance,
      distanceToSchool,
      estimatedTime: Math.round(minDistance * 5 + 10) // Simple estimation: 5 min per km + 10 min base
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Assign student to transport
// @route   POST /api/transport/assign
exports.assignTransport = async (req, res) => {
  try {
    const { studentName, location, pickupPointId, routeId, busId } = req.body;

    // Check seat availability
    const bus = await Bus.findById(busId);
    if (!bus || bus.availableSeats <= 0) {
      return res.status(400).json({ success: false, message: 'No seats available on this bus' });
    }

    const assignment = await TransportAssignment.create({
      studentName,
      location,
      pickupPoint: pickupPointId,
      route: routeId,
      bus: busId
    });

    // Update seat count
    bus.availableSeats -= 1;
    await bus.save();

    res.status(201).json({
      success: true,
      data: assignment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
