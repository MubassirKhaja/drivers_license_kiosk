const User = require('../models/newUserRegistration')


module.exports = (req, res, next) => {

    User.findById(req.session.userId)
    .then(user => {
        // next()
        
        if(!user ){
            return res.redirect('/login')
        }
        else{
            if(user.userType == 'Driver'){
                req.session.userType = 'Driver';
            }
            else if(user.userType == 'Admin'){
                req.session.userType = 'Admin';
            }
            else if(user.userType == 'Examiner'){
                req.session.userType = 'Examiner';
            }

            next()

        }
    })
    .catch(error => {
        return res.redirect('/login')
        next()
        console.log(error)
    })
    // User.findById(req.session.userId, (error, user ) =>{
    // if(error || !user )
    //     return res.redirect('/')
    //     next()
    // })
}

