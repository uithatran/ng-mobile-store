const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
  let userBody = {
    email: req.body.email,
    password: req.body.password
  }
  userModel.findOne({ email: userBody.email }, (err, user) => {
    if (err) {
      return next(err);
    } else {
      if (user != null) {
        // Load hash from your password DB.
        bcrypt.compare(userBody.password, user.password, function (err, result) {
          if(err) {
            return next(err);
          } else {
            if(result) {
              const token = jwt.sign({
                email: user.email,
              }, process.env.JWT_KEY,
              {
                expiresIn: "1h"
              });
              return res.status(200).json({
                message: 'Login successfully!',
                token: token
              })
            } else {
              res.status(401).json({
                message: 'Login failed',
              })
            }
          }
        });
      } else {
        res.status(401).json({
          error: 'Incorrect user or password'
        })
      }
    }
  })
}