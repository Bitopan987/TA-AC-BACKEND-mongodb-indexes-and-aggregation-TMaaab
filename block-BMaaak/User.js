var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    address: {
      city: { type: String },
      state: { type: String },
      country: { type: String },
      pin: { type: Number },
    },
  },
  { timestamps: true }
);

userSchema.index({ state: 1, country: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);
