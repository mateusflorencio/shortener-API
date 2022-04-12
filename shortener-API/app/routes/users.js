const express = require('express');
const router = express.Router();
const User = require("../model/user")
const jwt = require("jsonwebtoken");
const WithAuth = require("../middlewares/auth");

const secret = process.env.JWT_TOKEN;


router.get('/', WithAuth, async (req, res) => {
  let user = await User.findOne({
    _id: req.user._id
  });
  try {

    res.status(200).json({
      user
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal error, please, try again,"
    });
  }
});

router.post("/register", async (req, res) => {
  const {
    name,
    email,
    password
  } = req.body;

  const user = new User({
    name,
    email,
    password
  });

  try {
    await user.save();
    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({
      error: `e-mail already exists`
    })
  }
});


router.post("/login", async (req, res) => {
  const {
    email,
    password
  } = req.body;

  try {
    let user = await User.findOne({
      email
    });

    console.log(user)
    if (!user)
      res.status(401).json({
        error: "Incorrect email or password"
      });
    else {
      user.isCorrectPassword(password, function (err, same) {
        if (!same)
          res.status(401).json({
            error: "Incorrect email or password"
          });
        else {
          const token = jwt.sign({
            email
          }, secret, {
            expiresIn: "1d"
          });
          res.json({
            user: user,
            token: token
          });
        }
      })
    }
  } catch (error) {
    res.status(500).json({
      error: "Internal error, please, try again,"
    });
  };
});

router.put("/", WithAuth, async (req, res) => {
  const {
    name,
    email,
    password
  } = req.body;
  try {
    let user = await User.findOne({
      _id: req.user._id
    });
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }
    user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({
      error: "Problem to update a user"
    });
  };
});

router.delete("/", WithAuth, async (req, res) => {
  const user = await User.findOne({
    _id: req.user._id
  });
  try {
    await user.delete();
    res.json({
      message: "ok"
    }).status(204);
  } catch (error) {
    res.status(500).json(error);
  }
})


module.exports = router;