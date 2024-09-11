
const Appointment = require('../models/appointmentModel');
const userDetails = require('../models/newUserRegistration');
const dayjs = require("dayjs");


// // Admin view to create appointment slots
// router.get('/appointments', authAdminMiddleware, (req, res) => {
//     // Render the appointment creation view
//     // Display existing appointment slots
// });

// router.post('/appointments', authAdminMiddleware, async (req, res) => {
//     // Add new appointment slots
//     // Validate input and handle duplicates
// });

// module.exports = router;


module.exports = async (req, res) => {
    try {
        // Check if the user is logged in
        if (req.session.userId) {
            // Retrieve user information based on the userId

            if (req.session.userType =='Admin'){
                try {
                    // Fetch existing appointments from the database
                    const appointments = await Appointment.find({});
                    // console.log(appointments)
                    const dates = [];

                    for(const date of appointments){
                        const dt = dayjs(date.date);

                        if (!dates.includes(date.date.toISOString().split('T')[0])){
                            dates.push(String(date.date.toISOString().split('T')[0]))
                        } 
                        // else{}
                    }
                    // console.log(dates)
                    const events = dates.map(appointment => (
                    {
                        
                        title: 'Scheduled',
                        start: appointment, // You need to format this based on fullcalendar's requirements
                    }));
                    // console.log(events)
                    res.json(events);
                } catch (error) {
                    console.error(error);
                    res.status(500).send('Internal Server Error');
                }
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
