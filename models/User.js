const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true
    },
    password: {
      type: String
    },
    email: {
      type: String,
      unique: true
    },

    active: {
      type: Boolean,
      default: false
    },

    confirmationCode: {
      type: String,
      unique: true
    },
    googleID: String,
    recipes:[{type:Schema.Types.ObjectId, ref:"Recipe"}]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
