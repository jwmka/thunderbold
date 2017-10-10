var express = require('express');
var router = express.Router();
//const knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Auth' });
});

router.get('/registration', function(req, res, next) {
  res.render('registration', { title: 'Sign Up' });
});

module.exports = router;
