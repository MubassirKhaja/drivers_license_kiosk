// gPageController.js
const UserDataModel = require('../models/newUserRegistration')
const Appointment = require('../models/appointmentModel');



module.exports = async (req, res) => {
    try {
        const { selectedDate, selectedTime, testType } = req.body;
        const userId = req.session.userId;
        // console.log(req.body)
        // Find the user by ID
        const user = await UserDataModel.findById(userId);

        filter = {
            "date" : selectedDate,
            "time" : selectedTime
        }
        // Create a new appointment
        const newAppointment = {
            date: selectedDate,
            time: selectedTime,
            isTimeSlotAvailable: false, // Mark the slot as booked
        };
        // newAppointment
        // // Save the appointment to the database

        const doc = await Appointment.findOneAndUpdate(filter, newAppointment, {new: true});

        if(user.appointment){
            const releaseSlot =  await   Appointment.findOneAndUpdate({"_id" : user.appointment.toString() }, {isTimeSlotAvailable: true }, {new: true});
        }

        // // // Add the appointment ID to the user's appointments array
        user.appointment = doc._id;
        user.testType = testType

        // Save the updated user document
        await user.save();

        if (testType == "G2"){
            res.send('<script>alert("Slot Booked"); window.location.href = "/license_g2"; </script>'); // Redirect or render a success page
        }
        else{
            res.send('<script>alert("Slot Booked"); window.location.href = "/license_g"; </script>');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


