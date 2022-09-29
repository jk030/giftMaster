
const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const userSchema = new Schema({

  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  userName: { type: String, required: true },
  firstName:String,
  lastName:String,
  birthday:Date,
  religion:String,
},
{
  // this second object adds extra properties: `createdAt` and `updatedAt`
  timestamps: true,
}
);
module.exports = model("User", userSchema);