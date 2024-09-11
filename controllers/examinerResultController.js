
const userModel = require('../models/saveg2user');
const userAppModel = require('../models/newUserRegistration');

const Appointment = require('../models/appointmentModel');



module.exports = async (req, res) => {
    try {
        // Check if the user is logged in  
        if (req.session.userId) {
            if (req.session.userType == 'Examiner'){
                console.log(req.body)
                const user = await userAppModel.findById(req.body.userId);
                console.log(user)
                user.comment = req.body.comment
                user.result = req.body.passFail
                await user.save();
                await res.send('<script>alert("Result Updated"); window.location.href = "/examiner";</script>');
            }
            else{
                return res.send('<script>alert("Unauthorized User"); window.location.href = "/logout"; </script>');
            }

            
        } 
        else {
            // If the user is not logged in, redirect to the login page
            res.redirect('/login');
        }
    } 
    catch (error) {
        console.error('Error updating result', error);
        res.status(500).send('Internal Server Error');
    }
};

