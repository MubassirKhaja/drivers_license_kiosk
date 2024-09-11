
const Appointment = require('../models/appointmentModel');
const userDetails = require('../models/newUserRegistration');



module.exports = async (req, res) => {
    try {
        // Check if the user is logged in
        if (req.session.userId) {
            // Retrieve user information based on the userId
            // let user = await userDetails.find({ userid: req.session.userId }).exec();
            // console.log(user)
            if (req.session.userType =='Admin'){
                res.render('appointments');
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
