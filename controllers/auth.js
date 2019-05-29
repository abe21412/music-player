const User = require("../models/User");
const { validateRegistration, validateLogin } = require("../util/validate");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//endpoint for user registration
const register = async (req, res) => {
  let userInfo = req.body;
  //check registration info for validation errors
  let errors = await validateRegistration(userInfo);
  if (Object.entries(errors).length > 0) {
    return res.status(400).json(errors);
  }
  let { name, email, password } = userInfo;
  let newUser = new User({ name, email, password });

  //generate hashed password for new user, and save into db
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then(user => {
          res.status(200).json(user);
        })
        .catch(err => console.log(err));
    });
  });
};

//endpoint to log a user in
const login = async (req, res) => {
  let userInfo = req.body;
  //validate login information and check for errors
  let errors = validateLogin(userInfo);
  if (Object.entries(errors).length > 0) {
    return res.status(400).json(errors);
  }
  let { email, password } = userInfo;
  let user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ errors: "Invalid Credentials" });
  }
  //compare encrypted pw to the one sent in req body
  let match = await bcrypt.compare(password, user.password);
  //create, sign, and send token
  //expires in 24 hours
  if (match) {
    const jwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email
    };
    jwt.sign(
      jwtPayload,
      process.env.SECRET,
      { expiresIn: 86400 },
      (err, token) => {
        if (err) {
          throw err;
        } else {
          console.log(token);
          res.status(200).json({ token, ...jwtPayload });
        }
      }
    );
  } else {
    return res.status(400).json({ errors: "Invalid Credentials" });
  }
};

//middleware to authenticate for protected routes
//verify that token both exists and is valid
const verifyToken = (req, res, next) => {
  token = req.headers["x-auth-key"];
  if (!token) {
    res.status(401).json({ unauthorized: "NO TOKEN" });
    return;
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) res.status(401).json({ unauthorized: "INVALID TOKEN" });
    //puts decoded token info in res.locals so all protected routes have access to the user object
    res.locals = decoded;
    console.log(res.locals);
    next();
  });
};

module.exports = { register, login, verifyToken };
