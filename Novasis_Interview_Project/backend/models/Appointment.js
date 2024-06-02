const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  consultant: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultant' },
  status: { type: String, default: 'Pending' }, // Default status is 'Pending'
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
