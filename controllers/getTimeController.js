
const Appointment = require('../models/appointmentModel');


module.exports = async (req, res) => {
    try {
        // Check if the user is logged in
        if (req.session.userId) {
            if (req.session.userType =='Driver'){
                try {
                    const { selectedDate } = req.body;
                    // console.log(req.body)
                    // Fetch existing appointments for the selected date
                    const existingAppointments = await Appointment.find({ date: selectedDate, isTimeSlotAvailable: true });
            


                    const bookedTimes = existingAppointments.map(appointment => appointment.time);

                    res.json(bookedTimes)
            
                    // res.render('license_g2', { selectedDate, availableTimes });
                } catch (error) {
                    console.error(error);
                    res.status(500).send('Internal Server Error');
                }

        } 
    }
    else {
        // If the user is not logged in, redirect to the login page
        res.redirect('/login');
        }
    }
    catch (error) {
        console.error('Error rendering Admin Page:', error);
        res.status(500).send('Internal Server Error');
    }
};
