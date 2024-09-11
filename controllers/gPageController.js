// gPageController.js
const userModel = require('../models/saveg2user');
const userAppModel = require('../models/newUserRegistration');
const crypto = require('crypto-js')
const Appointment = require('../models/appointmentModel');

module.exports = async (req, res) => {
    try {
        // Check if the user is logged in
        if (req.session.userId) {
            // Retrieve user information based on the userId
            let user = await userModel.find({ userid: req.session.userId }).exec();
            

            user = user[0] // Convert to plain JavaScript object
            userAppointment = null

            if (user.licenseNumber === "new_user_default"){
                let examResult = {}
                res.render('license_g2', { user , userAppointment, examResult})
                // res.redirect('/license_g2');
            }
            else{
                // Render the G_page with user information
                user.licenseNumber = decrypt(user.licenseNumber);
                userDetails = await userAppModel.findById( req.session.userId ).exec();
                const availableDates = await Appointment.distinct('date', { isTimeSlotAvailable: true });
                // // Extract all available times for the selected date

                const availableTimes = {};
                userAppointment = await Appointment.findById( userDetails.appointment).exec();
                testType = userDetails.testType
                examResult = {
                    "result": userDetails.result,
                    "comment" : userDetails.comment
                }
                // console.log(user)
                res.render('license_g', { user,  availableDates, availableTimes,userAppointment, testType, examResult });

            }


        } else {
            // If the user is not logged in, redirect to the login page
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Error rendering G_page:', error);
        res.status(500).send('Internal Server Error');
    }
};


function decrypt(text){
    const result = crypto.AES.decrypt(text, 'd6F3Efeq');
    return result.toString(crypto.enc.Utf8);
  }