const express = require('express');
const router = express.Router();
const {
  getTransportDashboard,
  findNearestTransport,
  assignTransport
} = require('../controllers/transportController');

router.get('/dashboard', getTransportDashboard);
router.post('/find-nearest', findNearestTransport);
router.post('/assign', assignTransport);

module.exports = router;
