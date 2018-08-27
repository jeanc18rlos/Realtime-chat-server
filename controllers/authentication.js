var  jwt = require('jsonwebtoken'),
  crypto = require('crypto'),
  User = require('../models/user'),
  config = require('../config/main'),
  setUserInfo = require('../helpers').setUserInfo,
  Config = require('../models/config'),
  getRole = require('../helpers').getRole;

function generateToken(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: 10000 // in seconds
  });
}

//========================================
// Login Route
//========================================
exports.login = function (req, res, next) {
  let userInfo = setUserInfo(req.user);

  Config.findOne({ userId: userInfo._id }, function (err, docs) {
    if (err) {
      res.status(400).json({
        error: 'Verify your user and password inputs ' + err,
      });
    }
    else {
      res.status(200).json({
        token: 'Authorization ' + generateToken(userInfo),
        user: userInfo,
        config: docs

      });
    }
  })
}

//========================================
// Registration Route
//========================================
exports.register = function (req, res, next) {
  // Check for registration errors
  let email = req.body.email,
    firstName = req.body.firstName,
    lastName = req.body.lastName,
    password = req.body.password,
    country = req.body.country,
    currency = req.body.currency,
    phone = req.body.phone,
    pushNotifications = req.body.pushNotifications,
    calls = req.body.calls,
    sms = req.body.sms,
    emails = req.body.emails,
    sex = req.body.gender,
    birthDate = req.body.birthDate,
    city = req.body.city,
    userName = req.body.userName,
    inAppMessages = req.body.inAppMessages;

  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.' });
  }
  // Return error if full name not provided
  if (!firstName || !lastName) {
    return res.status(422).send({ error: 'You must enter your full name.' });
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' });
  }
  // Return error if additional data not provided
  if (!country || !currency || !phone || !pushNotifications || !calls || !sms || !emails || !sex || !birthDate || !city || !userName || !inAppMessages) {
    return res.status(422).send({ error: 'You must fill all the form fields.' });
  }


  User.findOne({ email: email }, function (err, existingUser) {
    if (err) { return next(err); }

    // If user is not unique, return error
    if (existingUser) {
      return res.status(422).send({ error: 'That email address is already in use.' });
    }

    // If email is unique and password was provided, create account
    let user = new User({
      userName: userName,
      currency: currency,
      email: email,
      password: password,
      profile: {
        phone: phone,
        country: country,
        city: city,
        sex: sex,
        birthDate: birthDate,
        inAppMessages: inAppMessages,
        pushNotifications: pushNotifications,
        sendEmails: emails,
        phoneCalls: calls,
        receiveSms: sms,
        firstName: firstName,
        lastName: lastName,
      }
    });

    user.save(function (err, user) {
      if (err) { return next(err); }

      // Subscribe member to Mailchimp list
      // mailchimp.subscribeToNewsletter(user.email);

      // Respond with JWT if user was created
      let configuration = new Config({
        userId: user._id
      });
      configuration.save(function (err, docs) {
        if (err) { return next(err); }
        let userInfo = setUserInfo(user);

        res.status(201).json({
          token: 'Authorization  ' + generateToken(userInfo),
          user: userInfo,
          config: docs
        });
      })

    });
  });
}
//========================================
// Authorization Middleware
//========================================

// Role authorization check
exports.roleAuthorization = function (requiredRole) {
  return function (req, res, next) {
    var  user = req.user;

    User.findById(user._id, (err, foundUser) => {
      if (err) {
        res.status(422).json({ error: 'No user was found.' });
        return next(err);
      }

      // If user is found, check role.
      if (getRole(foundUser.role) >= getRole(requiredRole)) {
        return next();
      }

      return res.status(401).json({ error: 'You are not authorized to view this content.' });
    });
  };
};
