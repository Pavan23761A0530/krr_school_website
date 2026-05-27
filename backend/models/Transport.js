const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
  busNumber: { type: String, required: true, unique: true },
  driverName: { type: String, required: true },
  driverContact: { type: String, required: true },
  totalSeats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  status: { type: String, enum: ['active', 'inactive', 'maintenance'], default: 'active' },
  currentLocation: {
    lat: { type: Number },
    lng: { type: Number }
  }
}, { timestamps: true });

const RouteSchema = new mongoose.Schema({
  routeName: { type: String, required: true },
  routeNumber: { type: String, required: true, unique: true },
  path: [{
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  }],
  villagesCovered: [String],
  timing: {
    pickup: { type: String, required: true },
    drop: { type: String, required: true }
  },
  bus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus' }
}, { timestamps: true });

const PickupPointSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' }
}, { timestamps: true });

const TransportAssignmentSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  location: {
    name: { type: String },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  pickupPoint: { type: mongoose.Schema.Types.ObjectId, ref: 'PickupPoint' },
  route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
  bus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus' },
  status: { type: String, enum: ['pending', 'active', 'cancelled'], default: 'active' }
}, { timestamps: true });

const Bus = mongoose.model('Bus', BusSchema);
const Route = mongoose.model('Route', RouteSchema);
const PickupPoint = mongoose.model('PickupPoint', PickupPointSchema);
const TransportAssignment = mongoose.model('TransportAssignment', TransportAssignmentSchema);

module.exports = { Bus, Route, PickupPoint, TransportAssignment };
