const { User } = require("../models/User");
const { createToken, verifyToken } = require("../config/Auth");
// = create user
const register = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(409).json({ error: "Username already exists" }); // Resource conflict
    }
    const newUser = await User.create(req.body);
    console.log(newUser);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// = get user
const login = async (req, res) => {
  try {
    // check if user exists
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // verify password
    if (req.body.password !== user.password) {
      console.log("Password is incorrect");
      return res.status(401).json({ error: "Invalid password" });
    }

    const payload = { id: user._id, username: user.username };
    const token = createToken(payload);
    res
      .status(200)
      .json({
        token,
        user: { id: user._id, name: user.name, username: user.username },
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  register,
  login,
};
