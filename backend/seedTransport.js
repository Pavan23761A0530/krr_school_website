const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Bus, Route, PickupPoint } = require('./models/Transport');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await Bus.deleteMany({});
    await Route.deleteMany({});
    await PickupPoint.deleteMany({});

    console.log('Existing transport data cleared.');

    // Sample School Location: 17.3850, 78.4867 (Hyderabad)
    
    // 1. Create Buses
    const buses = await Bus.insertMany([
      {
        busNumber: 'TS-01-KRR-101',
        driverName: 'Ramesh Kumar',
        driverContact: '+91 9876543210',
        totalSeats: 50,
        availableSeats: 42,
        currentLocation: { lat: 17.3850, lng: 78.4867 }
      },
      {
        busNumber: 'TS-01-KRR-102',
        driverName: 'Suresh Singh',
        driverContact: '+91 9876543211',
        totalSeats: 40,
        availableSeats: 15,
        currentLocation: { lat: 17.4000, lng: 78.5000 }
      },
      {
        busNumber: 'TS-01-KRR-103',
        driverName: 'Mahesh Babu',
        driverContact: '+91 9876543212',
        totalSeats: 50,
        availableSeats: 30,
        currentLocation: { lat: 17.3700, lng: 78.4500 }
      }
    ]);

    // 2. Create Routes
    const routes = await Route.insertMany([
      {
        routeName: 'North City Route',
        routeNumber: 'R-01',
        villagesCovered: ['Uppal', 'Nacharam', 'Habsiguda'],
        timing: { pickup: '07:30 AM', drop: '04:30 PM' },
        bus: buses[0]._id,
        path: [
          { lat: 17.3850, lng: 78.4867 }, // School
          { lat: 17.3984, lng: 78.5583 }, // Uppal
          { lat: 17.4258, lng: 78.5523 }, // Nacharam
          { lat: 17.4033, lng: 78.5311 }  // Habsiguda
        ]
      },
      {
        routeName: 'South City Route',
        routeNumber: 'R-02',
        villagesCovered: ['Charminar', 'Malakpet', 'LB Nagar'],
        timing: { pickup: '07:15 AM', drop: '04:45 PM' },
        bus: buses[1]._id,
        path: [
          { lat: 17.3850, lng: 78.4867 }, // School
          { lat: 17.3616, lng: 78.4747 }, // Charminar
          { lat: 17.3742, lng: 78.4988 }, // Malakpet
          { lat: 17.3457, lng: 78.5522 }  // LB Nagar
        ]
      }
    ]);

    // 3. Create Pickup Points
    await PickupPoint.insertMany([
      { name: 'Uppal Junction', location: { lat: 17.3984, lng: 78.5583 }, route: routes[0]._id },
      { name: 'Nacharam Cross Road', location: { lat: 17.4258, lng: 78.5523 }, route: routes[0]._id },
      { name: 'Habsiguda Metro', location: { lat: 17.4033, lng: 78.5311 }, route: routes[0]._id },
      { name: 'Charminar Gate', location: { lat: 17.3616, lng: 78.4747 }, route: routes[1]._id },
      { name: 'Malakpet Station', location: { lat: 17.3742, lng: 78.4988 }, route: routes[1]._id },
      { name: 'LB Nagar Ring Road', location: { lat: 17.3457, lng: 78.5522 }, route: routes[1]._id }
    ]);

    console.log('Transport data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
