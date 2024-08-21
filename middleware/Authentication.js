const jwt = require("jsonwebtoken");
const userModel = require("../models/userModal");

const auth = async (req, res, next) => {
  try {
    console.log(`authorization`, req.headers?.authorization);

    const token = req.headers?.authorization;
    console.log(`tokenns`, token);
    if (!token) {
      throw new Error("errror");
    } else {
      const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
      rootUser = await userModel.findOne({
        _id: verifyToken._id,
      });
      console.log(rootUser);
      if (!rootUser) {
        throw new Error("user Not found");
      }

      req.rootUser = rootUser;
      req.user_id = rootUser._id;
      next();
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = auth;
