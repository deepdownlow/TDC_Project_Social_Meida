const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');
const passport = require('passport');

//Require Model
const User = require('../../../models/User')

router.post('/register', (req, res) => {
 const { email, password } = req.body
 User.findOne({ email })
  .then(user => {
   if(user) res.status(400).send('email has been already registered! please login')
   const newUser = new User({
    email,
    password
   }) 
   bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    });
   })
  })
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json(`no user is found!`)
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        res.send('you are logged in successfully!')
      } else {
        return res.status(400).json('Password incorrect')
      }
    })
  })
})



module.exports = router