import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  hashed_password: {
    type: String,
    required: "Password is required",
  },
  salt: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.hashed_password = password;
  })
  .get(function () {
    return this._password;
  });
UserSchema.path("hashed_password").validate(function (v) {
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "Password must be at least 6 characters.");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required");
  }
}, null);

UserSchema.pre("save", async function () {
  if (!this.isModified("hashed_password")) return;
  this.hashed_password = await bcrypt.hash(this.hashed_password, 12);
});

UserSchema.methods = {
  authenticate: function (plainText) {
    return Boolean(plainText) && bcrypt.compareSync(plainText, this.hashed_password);
  },
};

export default mongoose.model("User", UserSchema);
