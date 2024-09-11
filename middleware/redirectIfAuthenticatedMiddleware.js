module.exports = (req, res, next) =>{
    if(req.session.userId){
        // res.send('<script>alert("Already Logged In"); window.location.href = "/license_g"; </script>');
        return res.redirect('/license_g') // if user logged in, redirect to home page
    }
    next()
    }