const { Booking } = require('../models');

exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const booking = await Booking.findAll();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
