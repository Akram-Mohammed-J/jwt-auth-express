const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: [5, "Minimum 6 chareacters"],
    max: [225, "Maximum of 225 characters"],
  },

  email: {
    type: String,
    required: true,
    min: [6, "Minimum 6 chareacters"],
    max: [225, "Maximum of 225 characters"],
    match: /.+\@.+\..+/,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: [6, "Minimum 6 chareacters"],
    match: /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{6,1024}$/,
    max: [1024, "Maximum of 225 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.pre("save", function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, (saltError, salt) => {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, (hashError, hash) => {
          if (hashError) {
            return next(hashError);
          }

          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});
module.exports = mongoose.model("user", UserSchema);
