const express = require('express')
const session = require('express-session')
const path = require('path')
const port = 4000
const ejs = require('ejs')
const app = express()

const bodyParser = require('body-parser')  
const mongoose = require('mongoose') 
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware =
require('./middleware/redirectIfAuthenticatedMiddleware')

global.loggedIn = null;
global.userType = null;
global.userAppointment = null;
global.availableDates  = null;

 

const conString ='mongodb+srv://khaja:khaja@cluster0.vouklj2.mongodb.net/' // copy from your MongoDb



try{
    const connection = mongoose.connect(conString)
    console.log('MongoDb Connected!!! Keep it up!!')

}
catch(err){
    console.log('MongoDb Not Connected!!! Try agian!!')
}


app.use(session({
    secret: 'khajassecretkeylolllx', 
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false } 
}));

app.set('view engine','ejs')

app.use(express.static('public')) 
app.use(bodyParser.json()) 

app.use(express.urlencoded({ extended: true }));
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    userType = req.session.userType;
    next()
});

app.get('/', (reqs, resp) => {
    // resp.end("Welcome to Drive Test! Page under Construction")
    resp.render('dashboard')

})

app.get('/dashboard', (reqs, resp) => {
    resp.render('dashboard')
})


app.get('/login', redirectIfAuthenticatedMiddleware,(reqs, resp) => {
    resp.render('login')
})
const userLogin = require('./controllers/loginController')
app.post('/login', userLogin)


const gPageController = require('./controllers/gPageController');
app.get('/license_g', authMiddleware,gPageController)


const carDetailsUpdateUserController = require('./controllers/carDetailsUpdateUserController')
app.post('/updateCarInfo', carDetailsUpdateUserController)




const g2PageController = require('./controllers/g2PageController');
app.get('/license_g2', authMiddleware,g2PageController)

const saveG2UserController = require('./controllers/saveG2UserController')
app.post('/saveG2data', saveG2UserController)





app.get('/signup', (reqs, resp) => {
    resp.render('signup')
})
const userRegistration = require('./controllers/userRegistrationController')
app.post('/signup', userRegistration)



const logoutController = require('./controllers/logoutController')
app.get('/logout', logoutController)



const adminController  = require('./controllers/adminController')
app.get('/appointments', authMiddleware,adminController)

const adminResultsController  = require('./controllers/adminResultsController')
app.get('/drivers_results', authMiddleware,adminResultsController)

const appointmentController  = require('./controllers/appointmentController')
app.get('/appointments/all', authMiddleware,appointmentController)

const appointmentScheduleController  = require('./controllers/appointmentScheduleController')
app.post('/appointments/generate', authMiddleware,appointmentScheduleController)

const getTimeController  = require('./controllers/getTimeController')
app.post('/appointments/getTime', authMiddleware,getTimeController)


const appointmentBookController  = require('./controllers/appointmentBookController')
app.post('/appointments/book', authMiddleware,appointmentBookController)


const examinerController  = require('./controllers/examinerController')
app.get('/examiner', authMiddleware,examinerController)


const examinerResultController  = require('./controllers/examinerResultController')
app.post('/examiner/updateStatus', authMiddleware,examinerResultController)



app.listen(port, () => {
    console.log(`Server Running!, Listeining on port : ${port}`)
})