const User = require("../models/User");

//finds user if exists and return data to client side
const getUserData = async (req, res) => {
  let user = res.locals;
  if (user === undefined) return;
  try {
    let userData = await User.findOne({ email: user.email });
    res.status(200).json({
      name: userData.name,
      email: userData.email,
      tracks: userData.tracks
    });
  } catch (e) {
    res.status(404).json({ err: "No Such User Found" });
  }
};

module.exports = { getUserData };
