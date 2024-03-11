const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const cors = require('cors') //to entertain frontend request as we run both on same local system
const { cloudinaryConnect } = require('./Config/cloudinary');
const dataBase = require('./Config/dataBase');
const UserRoutes = require('./Routes/User');
const ProfileRoute = require('./Routes/Profile');
const PaymentRoutes = require('./Routes/Payment');
const CourseRoute = require('./Routes/courses');
const AdditionlRoutes = require('./Routes/contactUs');


//adding the middleware to get the data and files
require('dotenv').config();
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp'
}));

app.use(cors({
    origin: process.env.origin,
    credentials: true
}))

//establish the connection between server and dabaBase

dataBase();
console.log('ALokRanjan');
//establish the connection from cloudinary

cloudinaryConnect();

//api mounting



app.use('/api/v1/user', UserRoutes);
app.use('/api/v1/profile', ProfileRoute);
app.use('/api/v1/payment', PaymentRoutes);
app.use('/api/v1/courses', CourseRoute);
app.use('/api/v1/contact', AdditionlRoutes)

//listening to the port

app.listen(4000, () => {
    console.log("Server is Started at the port number 4000");
})

//getting the test page
app.get('/', (req, res) => {
    res.send('Hello hii welcome to the study notion backend testing');
})
