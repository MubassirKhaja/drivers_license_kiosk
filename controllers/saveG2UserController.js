const user = require('../models/saveg2user')
const path = require('path')
const bcrypt = require('bcrypt');
const crypto = require('crypto-js')


module.exports=(req,res) => {

    user
    .findOneAndUpdate({ userid: req.session.userId }, {
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        // licenseNumber: req.body.licenseNumber,
        licenseNumber: encrypt(req.body.licenseNumber),
        age: req.body.age,
        dob: req.body.dob,
        car_details: {
            carMake: req.body.carMake,
            carModel: req.body.carModel,
            carYear: req.body.carYear,
            plateNumber: req.body.plateNumber,
          },
    })
    .then(data => {
        res.send('<script>alert("Details Updated Successfully"); window.location.href = "/license_g2"; </script>');

    })
    .catch(err => {
        console.error('Error updating car info:', err);
        res.status(500).send('Error updating car info');
    })




};





function encrypt(text){
  const result = crypto.AES.encrypt(text, 'd6F3Efeq');
  return result.toString();
}
 
