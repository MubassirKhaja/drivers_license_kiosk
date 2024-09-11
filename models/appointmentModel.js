const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    time: { type: String, required: true },
    isTimeSlotAvailable: { type: Boolean, default: true },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
