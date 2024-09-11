const bcrypt = require('bcrypt');
const userModel = require('../models/newUserRegistration')
const userData = require('../models/saveg2user')


module.exports = async (req, res) => {
    try {
        username = req.body.userName
        password = req.body.password

        // console.log(username)
        // console.log(password)

        const existingUser = await userModel.findOne({ username: username });

        if (!existingUser) {
            return res.send('<script>alert("Username does not exist. Please Sign Up"); window.location.href = "/signup"; </script>');
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (isPasswordValid) {
            // console.log(existingUser._id.toString())
            // Set session variables
            req.session.userId = existingUser._id.toString();
            req.session.userType = existingUser.userType;


            // userAppointment = {}  
            if (existingUser.userType === 'Driver') {
                // res.render('license_g2', { userAppointment})
                return res.send('<script>alert("Login Success"); window.location.href = "/license_g2"; </script>');
                // return res.redirect('/g2_page');
            } 
            else if (existingUser.userType === 'Admin') {
                
                return res.send('<script>alert("Login Success"); window.location.href = "/appointments"; </script>');
                // return res.redirect('/g2_page');
            }

            else if (existingUser.userType === 'Examiner') {
                
                return res.send('<script>alert("Login Success"); window.location.href = "/examiner"; </script>');
                // return res.redirect('/g2_page');
            }
            else {
                // Redirect to another page if needed
                // return res.redirect('/dashboard');
                return res.send('<script>alert("Login Success"); window.location.href = "/dashboard"; </script>');
            }

            

            
        }
        else{
            console.error('Error finding user:', username);
            return res.send('<script>alert("Invalid password"); window.location.href = "/login"; </script>');
            
        }
    } 
    catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
    }

};