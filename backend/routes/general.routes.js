const router = require('express').Router();

// import controllers
const { 
  get_properties, get_properties_by_id, get_properties_by_seller_id,
  get_seller_by_id, get_buyer_by_id
} = require('./../controllers/general.controller');

const { login, get_user } = require('../controllers/auth.controller');

// property related routes
router.get('/properties', get_properties);

router.get('/property', get_properties_by_id);

router.get('/propertiesFromSeller', get_properties_by_seller_id);

// agents related routes
router.get('/seller', get_seller_by_id);

// buyers related routes
router.get('/buyer', get_buyer_by_id);

// authetication routes
router.post('/login', login);

router.get('/get_user', get_user)

module.exports = router;