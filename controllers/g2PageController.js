// gPageController.js
const userModel = require('../models/saveg2user');
const userAppModel = require('../models/newUserRegistration');

const Appointment = require('../models/appointmentModel');
const crypto = require('crypto-js')


module.exports = async (req, res) => {
    try {
        // Check if the user is logged in   
        if (req.session.userId) {
            // Retrieve user information based on the userId
            let user = await userModel.find({ userid: req.session.userId }).exec();
            
            

            console.log(user)
            user = user[0] // Convert to plain JavaScript object
            
            
            if (user.licenseNumber === "new_user_default"){
                let examResult = {}
                res.render('license_g2', { user,examResult });
                // res.redirect('/license_g2', {user: user});
            }
            else{
                // DEcrypting the license number as the encrypted data is stored in database
                user.licenseNumber = decrypt(user.licenseNumber);

                userDetails = await userAppModel.findById( req.session.userId ).exec();
                const availableDates = await Appointment.distinct('date', { isTimeSlotAvailable: true });
                const availableTimes = {};
                userAppointment = await Appointment.findById( userDetails.appointment).exec();
                testType = userDetails.testType
                examResult = {
                    "result": userDetails.result,
                    "comment" : userDetails.comment
                }
                // console.log(examResult)
                res.render('license_g2', { user , availableDates, availableTimes,userAppointment, testType, examResult});
                // Render the G_page with user information

            }


        } else {
            // If the user is not logged in, redirect to the login page
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Error rendering G2_page:', error);
        res.status(500).send('Internal Server Error');
    }
};


function decrypt(text){
    const result = crypto.AES.decrypt(text, 'd6F3Efeq');
    return result.toString(crypto.enc.Utf8);
  }