const express = require('express');
const router =  express.Router();

//***************************************************************************************
//                              Contact us routes
//***************************************************************************************
const {contactus} = require('../Controllers/contactus');
router.post('/contactus',contactus);


module.exports = router;