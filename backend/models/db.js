const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    require: [true, "Please provide username"],
  },
  firstName: {
    type: String,
    trim: true,
    require: [true, "Please provide first name"],
  },
  lastName: {
    type: String,
    trim: true,
    require: [true, "Please provide second name"],
  },
  password: {
    type: String,
    trim: true,
    require: [true, "Please provide password"],
  },
});

const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  balance: {
    type: Number,
    require: true,
  },
});

const User = mongoose.model("User", UserSchema);
const Account = mongoose.model("Account", AccountSchema);

module.exports = { User, Account };
