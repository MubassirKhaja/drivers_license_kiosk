const mongoose = require('mongoose');

const newUserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, required: true },
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', default: null },
    testType: { type: String, enum: ['G', 'G2'], default: undefined },
    comment: { type: String, default: null },
    result: { type: Boolean, default: null },

  });

const userDataModel = mongoose.model('users', newUserSchema);
module.exports = userDataModel

