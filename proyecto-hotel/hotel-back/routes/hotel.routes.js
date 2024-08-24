const express = require('express');
const router = express.Router();
const hotelControllers = require('../controllers/hotelControllers.js');

router
    .get('/', hotelControllers.getAllRooms)
    .post('/changeStateRoom/:room', hotelControllers.changeState)

module.exports = router;