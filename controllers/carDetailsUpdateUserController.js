const g2DataModel = require('../models/saveg2user')
const crypto = require('crypto-js')





module.exports=(req,res) => {
    const licenseNumber = req.body.licenseNumber;
    const updatedCarInfo = {
        carMake: req.body.carMake,
        carModel: req.body.carModel,
        carYear: req.body.carYear,
        plateNumber: req.body.plateNumber,
    };


    g2DataModel
    .findOneAndUpdate({ userid: req.session.userId }, { 'car_details': updatedCarInfo })
    .then(data => {
        res.send('<script>alert("Details Updated Successfully"); window.location.href = "/license_g"; </script>');

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