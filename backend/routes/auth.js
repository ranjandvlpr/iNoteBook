const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var fetchUser = require("../middleware/fetchUser");
var jwt = require("jsonwebtoken");

const JWT_SECRET = "RANJAN IS GOOD BOY";

//route 1:create a user using post: "api/auth" no login reqiure

router.post(
  "/createuser",
  [
    body("name", "name is not defined").isLength({ min: 3 }),
    body("email", "email is not defined").isEmail(),
    body("passsword", "error").isLength({ min: 6 }),
  ],
  async (req, res) => {
    //if there are error return bad request
    const errors = validationResult(req);
    let success = false
    if (errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success, error: "same email error" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //create a user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: user.id,
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

//Route 3:Authencation ocreate a user using post: "api/auth" no login reqiure

router.post(
  "/login",
  [
    body("email", "Enter the valid email").isEmail(),
    body("passsword", "Enter the correct password").exists(),
  ],
  async (req, res) => {
    //if there are error return bad request
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let success = false
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Please enter the correct details" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success, error: "Please enter the correct password" });
      }

      const data = {
        user: {
          id: user.id,
        }
      }

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true
      res.json({ success, authtoken });

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//routw 3 get login user detail:post "auth/api/login". Login required
router.post(
  "/getuser", fetchUser,
  async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId);
      res.send(user);
    }
    catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  });

module.exports = router;
