const g2DataModel = require('../models/saveg2user')
const bcrypt = require('bcrypt');

module.exports= async(req,res) => {

    g2DataModel
    .findById({ _id: req.session.userId })
    .then(data => {
        // console.log(data.firstname)
        if (data.length === 0){
            res.render('license_g', { user:null });
        }
        else{
            res.render('license_g', { user:data });
        }
    })
    .catch(err => {
        console.error('Error searching for user:', err);
        res.status(500).send('Error searching for user');
    })
};
    


