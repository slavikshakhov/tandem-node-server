const express = require("express");
var nodemailer = require("nodemailer");
const app = express();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const router = express.Router();

const db = require("../mysql");
const seq = require("sequelize");
const Op = seq.Op;
const bcrypt = require("bcrypt");
const saltRounds = 10;

let _ = require("lodash");

const User = require("../models/User");
const OfferedLg = require("../models/OfferedLg");
const WantedLg = require("../models/WantedLg");

router.post(
  "/register",
  [
    check("password")
      .isLength({ min: 4, max: 8 })
      .withMessage("Must be between 4 and 8 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let { name, email, password, city, country } = req.body;
    name = name.toLowerCase();

    var user = await User.findOne({ where: { name: name } });
    if (user) {
      res.status(400).json("user with this name already exists");
    } else {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        //save hash as pw in db
        if (err) {
          res.json("password could not be hashed");
        } else {
          User.create({ name, email, password: hash, city, country });
          res.status(200).json({ message: "Successfully registered!" });
        }
      });
    }
  }
);

router.post("/login", async (req, res) => {
  let { name, password } = req.body;
  name = name.toLowerCase();
  var user = await User.findOne({ where: { name: name } });
  if (!user) {
    res.status(401).json({ message: "No user with this name!" });
  } else {
    bcrypt.compare(password, user.password, (error, isMatch) => {
      if (!isMatch) {
        res.status(403).json("password is incorrect!");
      } else {
        jwt.sign(
          { id: user.id, name: user.name },
          "secretkey",
          { expiresIn: "300s" },
          (err, token) => {
            delete user.password;
            console.log(user.email);
            res.json({
              token,
              user,
            });
          }
        );
      }
    });
  }
});

router.post("/addUserOfferedLgs", async (req, res) => {
  var user = await User.findOne({
    where: { id: req.body.id },
    include: OfferedLg,
  });
  var lgs = await OfferedLg.findAll({
    where: { name: { [Op.or]: [...req.body.offeredLgs, ""] } },
  });

  await user.setOfferedlgs(lgs);
  var updatedUser = await User.findOne({
    where: { id: req.body.id },
    include: OfferedLg,
  });
  res.status(200).json(updatedUser);
});

router.post("/addUserWantedLgs", async (req, res) => {
  var user = await User.findOne({
    where: { id: req.body.id },
    include: WantedLg,
  });
  var lgs = await WantedLg.findAll({
    where: { name: { [Op.or]: [...req.body.wantedLgs, ""] } },
  });
  await user.setWantedlgs(lgs);
  var updatedUser = await User.findOne({
    where: { id: req.body.id },
    include: WantedLg,
  });
  res.status(200).json(updatedUser);
});

router.post("/thisUserofferedlgs", async (req, res) => {
  var userOfferedLgs = await User.findOne({
    where: { id: req.body.id },
    attributes: ["name", "city", "country"],
    include: [
      {
        model: OfferedLg,
        attributes: ["name"],
      },
    ],
  });
  res.json(userOfferedLgs);
});
router.post("/thisUserwantedlgs", async (req, res) => {
  var userWantedLgs = await User.findOne({
    where: { id: req.body.id },
    attributes: ["name", "city", "country"],
    include: [
      {
        model: WantedLg,
        attributes: ["name"],
      },
    ],
  });
  res.json(userWantedLgs);
});

router.post("/filterUsers", async (req, res) => {
  //const {offeredLgs, wantedLgs} = req.body;
  var usersOfferedLgs = await User.findAll({
    attributes: ["name", "email", "city", "country"],
    include: [
      {
        model: OfferedLg,
        where: { name: { [Op.or]: req.body.wantedLgs } },
        attributes: ["name"],
      },
    ],
  });
  var usersWantedLgs = await User.findAll({
    attributes: ["name", "email", "city", "country"],
    include: [
      {
        model: WantedLg,
        where: { name: { [Op.or]: req.body.offeredLgs } },
        attributes: ["name"],
      },
    ],
  });
  let filteredUsers = [];

  for (const offeredLg of usersOfferedLgs) {
    for (const wantedLg of usersWantedLgs) {
      //exclude logged in user from list of matched users

      if (offeredLg.name === wantedLg.name) {
        console.log(JSON.stringify(offeredLg));
        let newObj = {};
        filteredUsers.push({
          ...newObj,
          name: offeredLg.name,
          email: offeredLg.email,
          city: offeredLg.city,
          country: offeredLg.country,
          offeredLgs: offeredLg.offeredlgs
            .map(({ name }) => ({ name }))
            .map(Object.values)
            .reduce((a, b) => a.concat(b)),
          wantedLgs: wantedLg.wantedlgs
            .map(({ name }) => ({ name }))
            .map(Object.values)
            .reduce((a, b) => a.concat(b)),
        });
      }
    }
  }

  res.json({ filteredUsers });
});

router.post("/sendemail", async (req, res) => {
  const { from, password, to, subject, text } = req.body;
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: from,
      pass: password,
    },
  });

  var mailOptions = {
    from,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(404).json(error);
    } else {
      res.json(info);
    }
  });
});

router.get("/allUsersofferedlgs", async (req, res) => {
  var users = await User.findAll({
    attributes: ["name", "email", "city", "country"],
    include: [
      {
        model: OfferedLg,
        attributes: ["name"],
      },
    ],
  });
  res.json(users);
});
router.get("/allUserswantedlgs", async (req, res) => {
  var users = await User.findAll({
    attributes: ["name", "email", "city", "country"],
    include: [
      {
        model: WantedLg,
        attributes: ["name"],
      },
    ],
  });
  res.json(users);
});

module.exports = router;

/*
let sql = 'SELECT * FROM users WHERE name = ?';
  db.query(sql, [name], (err, result) => {
      if(err){
          db.end();
          res.json('error querrying the database');
      }
      if(result.length > 0){
          res.status(400).json('user with this name already exists');
      } else {
          bcrypt.hash(password, saltRounds, function(err, hash) {
              //save hash as pw in db
              if(err){
                  res.json('password could not be hashed');
              } else {
                  let user = {name, password: hash, city, country}
                  let sql = 'INSERT INTO users SET ?';
                  db.query(sql, user, (err, result) => {
                      if(err){
                          res.json('successuflly connected to db but not posted');
                      } else {
                          res.json(user.password);
                      }
                  });
              }
          });
      }
  });

  
  let sqlUser = 'SELECT * FROM users WHERE name = ?';
  db.query(sqlUser, [name], (err, result) => {
    if(err){
      db.end();
      res.json('error querying the database');
    } else if(result.length === 0){
      res.status(401).json('no user with this name');
    } else if(result.length === 1){
        const user = result[0];
        console.log(password);
        console.log(user.password);
        bcrypt.compare(password, user.password.toString(), (error, isMatch) => {
          if(!isMatch){
            res.status(403).json('password is incorrect!');
          } else {
            jwt.sign({id: user.id, name: user.name}, 'secretkey', { expiresIn: '30s' }, (err, token) => { 
              delete user.password;
              res.json({
                token,
                user
              });
            });
          }
        });
        }
    });
  */
