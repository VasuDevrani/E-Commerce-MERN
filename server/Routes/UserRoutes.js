import express from "express";
import UserModel from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
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
          isSeller: user.isSeller
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

router.post('/signup', async(req, res) => {
  console.log(req.method)
  try{
    const newUser = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
      isSeller: user.isSeller
    });
  }catch(err){
    res.status(404).json({message: err.message});
  }

})

router.put('/registerSeller', async(req, res) => {
  console.log(req.method)
  const {_id} = req.body;
  const { isSeller } = req.body;
  const update = isSeller;

  try{
        const data = await UserModel.findByIdAndUpdate(_id, {
          isSeller: update
        });

        res.status(200).json(data);
  }catch(err){
    res.status(404).json({message: err.message});
  }
})

export default router;
