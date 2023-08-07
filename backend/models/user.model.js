const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");


const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email")
        }
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.isEmailTaken = async function (email) {
  const result = await this.findOne({ email: email });
  return result;
};


userSchema.methods.isPasswordMatch = async function (password) {
  return bcrypt.compare(password, this.password);
};



const User = mongoose.model("user", userSchema);
module.exports = { User }