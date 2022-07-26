import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    isSeller: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  } 
);

const UserModel = mongoose.model("UserModel", userSchema);
export default UserModel;
