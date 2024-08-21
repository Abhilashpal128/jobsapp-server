const userModel = require("../models/userModal");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(404).send({ message: "All feilds are required" });
    }
    const userExists = await userModel.findOne({ email: email });
    if (!userExists) {
      const userData = new userModel(req.body);
      let token = await userData.generateAuthToken();
      console.log(token);
      console.log(typeof email);

      if (email.toString().endsWith("@alphaware.com")) {
        userData.isAdmin = true;
      }
      const data = await userData.save();
      console.log(`data`, data);
      return res
        .status(200)
        .send({ message: "User saved successfully", data: data });
    }
    return res.status(400).send({ message: "user Already exists" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "something went wrong" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all Detail" });
    }
    const userExist = await userModel.findOne({ email: email });
    if (userExist) {
      const isMatched = await bcrypt.compare(password, userExist.password);
      if (isMatched) {
        const token = await userExist.generateAuthToken();
        res.cookie("jwtoken", token, {
          httpOnly: true,
        });
        const result = { token, data: userExist };
        return res.status(200).json({
          message: "user Logged in successfully",
          result,
        });
      }
      return res.status(404).json({ message: "Invalid email or password" });
    }
    return res.status(404).json({ message: "user not found" });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "something went wrong", error: error.message });
  }
};

module.exports = {
  createUser,
  userLogin,
};
