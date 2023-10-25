const { generateToken } = require("../helpers/jwt");
const { User } = require("../models");

module.exports = class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "EmptyEmail" };
      }

      if (!password) {
        throw { name: "EmptyPassword" };
      }

      const user = await User.findOne({ where: {email} });

      if (!user) {
        throw { name: "Unauthorized" };
      }

      const access_token = generateToken({ id: user.id });

      res.status(200).json({ access_token });
    } catch (error) {
      // next(error);
      console.log(error, "<<");
    }
  }
};
