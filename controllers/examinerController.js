
const Appointment = require('../models/appointmentModel');
const userDetails = require('../models/newUserRegistration');
const userModel = require('../models/saveg2user');
const crypto = require('crypto-js')
module.exports = async (req, res) => {
    try {
        // Check if the user is logged in
        if (req.session.userId) {

            if (req.session.userType =='Examiner'){
                try {
                    // Fetch all users and appointments 

                    const bookedUsers = []
                    const Appointments = await userDetails.find({ userType: 'Driver', appointment: { $ne: null } }).populate('appointment');
                    await Promise.all(Appointments.map(async (element) => {
                        const userInfo = await userModel.find({ userid: element._id }).exec();
                    
                        const user = {
                            "userId": element._id.toString(),
                            "appointment_date": element.appointment.date,
                            "appointment_time": element.appointment.time,
                            "testType": element.testType,
                            "firstName": userInfo[0].firstname,
                            "lastName": userInfo[0].lastname,
                            "licenseNumber": decrypt(userInfo[0].licenseNumber),
                            "car_details": userInfo[0].car_details.carMake + " " + userInfo[0].car_details.carModel,
                            "plateNumber": userInfo[0].car_details.plateNumber,
                        };
                    
                        bookedUsers.push(user);
                    }));
                    
                    // Now, bookedUsers array is filled
                    // console.log(bookedUsers);
                    
                    // Render the page with the list of users and a filter option
                    await res.render('examiner', { bookedUsers });
                } catch (error) {
                    console.error(error);
                    res.status(500).send('Internal Server Error');
                }
                // res.render('examiner');
            }
            else {
                return res.send('<script>alert("Unauthorized Accesss"); window.location.href = "/logout"; </script>');
            }

        } else {
            // If the user is not logged in, redirect to the login page
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Error rendering Admin Page:', error);
        res.status(500).send('Internal Server Error');
    }
};


function decrypt(text){
    const result = crypto.AES.decrypt(text, 'd6F3Efeq');
    return result.toString(crypto.enc.Utf8);
  }