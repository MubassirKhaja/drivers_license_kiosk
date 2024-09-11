module.exports = (req, res) =>{


    global.userAppointment = null;
    global.availableDates  = null;
    req.session.destroy(() =>{

    res.redirect('/')
    })
}