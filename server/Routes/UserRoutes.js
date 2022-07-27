import express from "express";
import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../Utils/Utils.js";

const router = express.Router();

router.post("/signin", async (req, res) => {
  try {
    const user = await UserModel.findOne ({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
      }else{
        res.status(500).json({ message: "Password didn't match" });
      }
    }else{
        res.status(500).json({ message: "no such user found" });
    }
  } catch (err) {
    res.status(500).json({ message: "no such user found" });
  }
});

export default router;
