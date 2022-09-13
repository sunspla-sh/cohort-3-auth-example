const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const bcryptjs = require('bcryptjs');

router.get('/', (req, res, next) => {
  res.render('index.hbs');
});

router.get('/signup', (req, res, next) => {
  res.render('signup.hbs');
});

router.post('/signup', (req, res, next) => {
  console.log(req.body);

  const myUsername = req.body.username;
  const myPassword = req.body.password;

  //USE BCRYPT HERE
  const myHashedPassword = bcryptjs.hashSync(myPassword);

  User.create({
    username: myUsername,
    password: myHashedPassword
  })
    .then(savedUser => {
      console.log(savedUser);
      res.send(savedUser);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    })
});

router.get('/login', (req, res, next) => {
  res.render('login.hbs');
})

router.post('/login', (req, res, next) => {
  console.log(req.body);

  const myUsername = req.body.username;
  const myPassword = req.body.password;

  User.findOne({
    username: myUsername
  })
    .then(foundUser => {

      console.log(foundUser);

      if(!foundUser){
        res.send('no user matching this username');
        return;
      }

      //
      const isValidPassword = bcryptjs.compareSync(myPassword, foundUser.password)

      if(!isValidPassword){
        res.send('incorrect password');
        return;
      }

      res.send('password matched - log in successful')
      
    })
    .catch(err => {
      res.send(err)
    })
})

module.exports = router;