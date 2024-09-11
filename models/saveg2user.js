const mongoose = require('mongoose');

// const g2Schema = new mongoose.Schema({
//   firstname: String,
//   lastname: String,
//   licenseNumber: String,
//   age: Number,
//   dob: String,
//   car_details: {
//     carMake: String,
//     carModel: String,
//     carYear: String,
//     plateNumber: String,
//   },
// });

const g2Schema = new mongoose.Schema({
    // username: { type: String,  unique: true },
    // password: { type: String },
    // userType: { type: String },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'newUserRegistration',
      required: true
    },
    firstname: { type: String, default: 'new_user_default' },
    lastname: { type: String, default: 'new_user_default' },
    licenseNumber: { type: String, default: 'new_user_default' },
    age: { type: Number, default: 0 },
    dob: { type: String, default: 'new_user_default'},
    car_details: {
      carMake: { type: String, default: 'new_user_default' },
      carModel: { type: String, default: 'new_user_default' },
      carYear: { type: String, default: '0' },
      plateNumber: { type: String, default: 'new_user_default' },
    },
  });

const g2DataModel = mongoose.model('user_details', g2Schema);
module.exports = g2DataModel


