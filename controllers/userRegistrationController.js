const user = require('../models/newUserRegistration')
const userData = require('../models/saveg2user')

const bcrypt = require('bcrypt');

// newUserRegistration

module.exports=async (req,res) => {
    // console.log(req.body)
    password = req.body.password
    repeatPassword = req.body.repeatPassword

    if (password !== repeatPassword) {
        // return res.status(400).send('Passwords do not match');
        return res.send('<script>alert("Passwords does not match"); window.location.href = "/signup"; </script>');
    }
    
    username= req.body.userName;
    let existingUser = await user.findOne({ username: username });

    if (existingUser) {
        // return res.status(400).send('Username already exists. Please choose a different username.');
        return res.send('<script>alert("Username already exists. Please choose a different username."); window.location.href = "/signup"; </script>');
    }

    try{
        const newUser = new user(
            {
                username: req.body.userName,
                password: bcrypt.hashSync(password, 10),
                userType: req.body.userType,

            });
        // console.log(dataG2)

        newUser
        .save(newUser)
        .then(data => {
            console.log("data")
            console.log(data)
            const dataG2 = new userData(
                {   
                    userid: data._id 


                });

            dataG2.save(dataG2)

            res.send('<script>alert("User Registration Success"); window.location.href = "/login"; </script>');
            // res.status(201).send('User saved successfully').render('license_g', { user:0 });
            // res.render('license_g', { user:0 });
        })
        .catch(err => {
            console.error('Error registrating user:', err);
            res.status(500).send('Error registrating user');
        })


    } 
    catch (error) {
        console.error('Error in signup:', error);
        res.status(500).send('Internal Server Error');
    }

    // finally{
    //     let existingUser = await user.findOne({ username: username });
    //     console.log(existingUser) 
    //     if (existingUser){
    //         const dataG2 = new userData(
    //             {   
    //                 userid: existingUser._id 


    //             });

    //         dataG2
    //         .save(dataG2)
    // }}

};

