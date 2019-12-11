const crypto = require("crypto");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const nodemailer = require("nodemailer");
const isEmpty = require("is-empty");
require("dotenv").config();

const validateRegisterInput = require("../../validation/user/register");
const validateLoginInput = require("../../validation/user/login");
const validateForgotPasswordInput = require("../../validation/user/forgotPassword");
const validateUpdatePasswordInput = require("../../validation/user/updatePassword");

const User = require("../../models/User");


// @route GET api/users/users
// @desc retrieve a list of registered users -- optional body param search
// @access public
router.get("/users", (req, res) => {

  if ( isEmpty(req.query || req.query.search === "" ) ) {
    User.find().then( users => res.json(users)).catch(err => console.log(err));
  } else {
    User.find({ name: req.query.search }).then( users => res.json(users)).catch(err => console.log(err));
  }

});

// @route GET api/users/:id/showUser
// @desc retrieve info about user for user page
// @access public
router.get("/:id/showUser", (req, res) => {

  var id = req.params.id;
  User.findOne({ _id: id }, {username: 1, favorite_team: 1, status: 1}).then(user => res.json(user)).catch(err => console.log(err));

});

// @route DELETE api/users/deleteUser
// @desc Delete a user by id
// @access public
router.delete("/deleteUser", (req, res) => {

  User.findOne({ _id: req.body.id }).then( user => {
    if (!user) {
      return res.status(404).json({ user: "That id does not exist, delete failed" });
    } else {
      User.deleteOne({ _id: req.body.id }).then( user => console.log(user));
      return res.status(200).json({ user: "User successfully deleted" });
    }
  });

});

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {

  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({$or: [{ email: req.body.email }, { username: req.body.username }] }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email or username already exists" });
    } else {
      const new_user = new User({
        name:req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        resetPasswordToken: null,
        resetPasswordExpires:null
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(new_user.password, salt, (err, hash) => {
          if (err) throw err;
          new_user.password = hash;
          new_user.save().then(user => res.json(user)).catch(err => console.log(err));
        });
      });
    }
  });

});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {

  const{ errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          username: user.username
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({ passwordincorrect: "Password incorrect" });
      }
    });
  });

});

// @route POST api/users/forgotPassword
// @desc send email to user to prompt reset of password
// @access Public
router.post("/forgotPassword", (req, res) => {

  const{ errors, isValid } = validateForgotPasswordInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;

  User.findOne({ email }).then(user => {
    if(!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    const token = crypto.randomBytes(20).toString("hex");
    User.updateOne({ email: email }, {
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 360000
    }, function(err, affected, res) {
      console.log(res);
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${process.env.REACT_APP_EMAIL_ACCOUNT}`,
        pass: `${process.env.REACT_APP_EMAIL_PASSWORD}`
      }
    });

    const mailOptions = {
      from: "nostra.help@gmail.com",
      to: `${user.email}`,
      subject: "Link to Reset Password",
      text:
        "You are receiving this email because a request has been made to reset the password for your account. \n\n" +
        "Please click on the following link, or paste it into your browser and follow the steps to complete the process. \n\n" +
        `http://${process.env.REACT_APP_EMAIL_DOMAIN}/reset/${token} \n\n` +
        "This link will expire in one hour, if you did not request this, please ignore this email and your password \n\n" +
        "will remain unchanged. \n\n\n" +
        "Thanks for using our service, \n\n" +
        "Nostra Support Team \n"
    };

    console.log("sending mail");

    transporter.sendMail(mailOptions, function(err, res){
      if (err) {
        console.error("there was an error: ", err);
      }
    });

    res.status(200).send({ message: "recover email sent" });
  });

});

// @route POST api/users/forgotPassword
// @desc validate token passed corresponds to user
// @access Public
router.post("/validateToken", (req, res) => {

  const resetPasswordToken = req.body.resetPasswordToken;
  User.findOne({ resetPasswordToken: resetPasswordToken, resetPasswordExpires: { $gt: Date.now() } })
      .then(user => {
        if(!user) {
          return res.status(404).json({ email: "Password reset link is invalid or has expired" });
        } else {
          res.status(200).send({
            email: user.email,
            message: 'password reset link valid'
          });
        }
  });

});

// @route PUT api/users/updatePassword
// @desc update user's password after link is visited
// @access Public
router.put("/updatePassword", (req, res) => {

  const { errors, isValid } = validateUpdatePasswordInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt
          .hash(req.body.password, salt, (err, hash) => {
            User.updateOne({ email: user.email }, {
              password: hash,
              resetPasswordToken: null,
              resetPasswordExpires: null
            }, function(err, affected, res) {
              console.log(res);
            })
            .then(() => {
              console.log("password updated");
              res.status(200).send({ message: "password updated"});
            });
          });
      });
    }
  });
  
});

// @route GET api/users/userInformation
// @desc retrieve a list of registered users -- optional body param search
// @access private
router.get("/userInformation", (req, res) => {

  var id_list = JSON.parse(req.query.id_list);

  if ( isEmpty(req.query) ) {
    User.find().then( users => res.json(users)).catch(err => console.log(err));
  } else {
    User.find({ _id : { $in : id_list } }).then( users => res.json(users)).catch(err => console.log(err));
  }

});

// @route PUT api/users/editUser
// @desc edit user information - used for user settings
// @access public
router.put("/:id/editUser", (req, res) => {

  var id = req.params.id;

  User.findOne({ _id: id }).then( user => {
    if (!user) {
      return res.status(404).json({ user: "That id does not exist."});
    } else {
      User.updateOne({ _id: id }, {
        status: req.body.status,
        favorite_team: req.body.favorite_team,
        site_admin: req.body.site_admin
      }, function(err, affected, res) {
        console.log(res);
      })
      .then(() => {
        console.log("user updated");
        res.status(200).send({ message: "user updated successfully" });
      });
    }
  });

});


module.exports = router;
