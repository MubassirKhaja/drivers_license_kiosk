
const userModel = require('../models/saveg2user');
const userDetails = require('../models/newUserRegistration');

const crypto = require('crypto-js')
module.exports = async (req, res) => {
    try {
        // Check if the user is logged in
        if (req.session.userId) {

            if (req.session.userType =='Admin'){
                try {
                    const usersData = []
                    const passFailUsers = await userDetails.find({ userType: 'Driver', result: { $exists: true } });
                    await Promise.all(passFailUsers.map(async (element) => {
                        const userInfo = await userModel.find({ userid: element._id }).exec();
                    
                        const user = {
                            "result": element.result,
                            "comment": element.comment,
                            "firstName": userInfo[0].firstname,
                            "lastName": userInfo[0].lastname,
                            "licenseNumber": decrypt(userInfo[0].licenseNumber),

                        };
                    
                        usersData.push(user);
                    }));
                    console.log(usersData)
                    await res.render('passFail', { usersData });

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