
const Appointment = require('../models/appointmentModel');
const userDetails = require('../models/newUserRegistration');



module.exports = async (req, res) => {
    try {
        // Check if the user is logged in
        if (req.session.userId) {
            try {
                const { date } = req.body; // You may need to modify this based on your form input
                const existingAppointments = await Appointment.find({ date });
                // console.log( date )
        
                if (existingAppointments.length > 0) {
                    return res.send(`<script>alert("Appointments already exist for this date ${date}"); window.location.href = "/appointments" </script>`)

                }
        
                const startTime = new Date(`${date}T04:00:00`);
                const endTime = new Date(`${date}T11:30:00`);
                const timeInterval = 30; // in minutes
        
                const appointmentSlots = generateAppointmentSlots(startTime, endTime, timeInterval, date);

        
                // // Save appointment slots to the database
                await Appointment.insertMany(appointmentSlots);
        
                // // res.sendStatus(200);
                return res.send(`<script>alert("Scheduled slots for ${date}"); window.location.href = "/appointments" </script>`)
            } catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
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


function generateAppointmentSlots(startTime, endTime, timeInterval, date) {
    const appointmentSlots = [];
    let currentTime = startTime;

    while (currentTime < endTime) {
        const timeSlot = currentTime.toISOString().substr(11, 5); // Format as HH:mm
        appointmentSlots.push({ date:String(date), time: timeSlot });
        currentTime.setMinutes(currentTime.getMinutes() + timeInterval);
    }

    return appointmentSlots;
}