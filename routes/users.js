var express = require('express');
var router = express.Router();
const knex = require('../db/knex');

/* GET users listing. */
router.get('/', function(req, res, next) {
  knex('users')
    .select()
    .then(users_array => {
      res.render('users.hbs', {users: users_array});
    });
});


router.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  respondAndRenderUser(id, res, 'edit');
});

router.get('/:id/reset', (req, res) => {
  const id = req.params.id;
  respondAndRenderUser_nopassword(id, res, 'reset');
});

router.post('/', (req, res) => {
  validateUserRenderError(req, res, (users) => {
    users.date = new Date();
    users.role = 'User';
    users.login = users.email;
    knex('users')
      .insert(users, 'id')
      .then (ids => {
        const id = ids[0];
        res.redirect('/users');
      });
    });
});

router.put('/:id', (req, res) => {
  validateUserRenderError(req, res, (users) => {
    users.date = new Date();
    const id = req.params.id;
    knex('users')
      .where('id',id)
      .update(users,'id')
      .then(() => {
        res.redirect('/users');
      });
  });
});

router.delete('/:id', (req,res) => {
   const id = req.params.id;
   if(validId(id)){
     knex('users')
      .where('id',id)
      .del()
      .then(() => {
        res.redirect('/users');
      });
   } else {
     res.status(500);
     res.render ('error',{
       message:"InvalidId"
     });
   }
});


function respondAndRenderUser(id,res,viewName) {
  if(validId(id)) {
    knex('users')
      .select()
      .where('id', id)
      .first()
      .then (users => {
        res.render(viewName, users);
      });
  } else {
    res.status(500);
    res.render('error',{
      message: 'InvalidId'
    });
  }
}

function respondAndRenderUser_nopassword(id,res,viewName) {
  if(validId(id)) {
    knex('users')
      .select()
      .where('id', id)
      .first()
      .then (users => {
        users.password = '';
        res.render(viewName, users);
      });
  } else {
    res.status(500);
    res.render('error',{
      message: 'InvalidId'
    });
  }
}

function validateUserRenderError(req,res,callback) {
    if(validUser(req.body)) {
      const user = {
        name : req.body.name,
        email :req.body.email,
        password:req.body.password
      };

      callback(user);
    } else {
      res.status(500);
      res.render ('error',{
        message : 'Invalid Todo'
      });
    }
}




function validUser(users) {
   return typeof users.name == 'string' && users.name.trim() != '' &&
          typeof users.email == 'string' && users.email.trim() != '' &&
          typeof users.password == 'string' && users.password.trim() != ''
}

function validId(id) {
  return !isNaN(id);
}








module.exports = router;
