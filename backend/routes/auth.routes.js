// All the routes in this file require appropriate authentication & authorization
// the middleware will be added directly in the app.js

const router = require('express').Router();

const { get_applied_properties } = require('./../controllers/buyer.controller');
// const {  } = require('./../controllers/seller.controller')

// routes specific to sellers


// routes specific to buyers,
// technically the id of the buyer will be in the localStorage or something
router.get('/appliedProperties', get_applied_properties)


module.exports = router;