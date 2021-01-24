const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        maxLength: 140,
      },
      password: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
        maxLength: 140,
      },
      followers: Array,
      following: Array,
  },
  {collection: 'users'},
  {
    toJSON: {
      transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
      }
    }
  });

userSchema.pre('save', function preSave(next) {
  this.password = bcrypt.hashSync(this.password, 8);
  next();
});

userSchema.pre('findOneAndUpdate', function preSave(next) {
  if (!this._update.password) {
    return;
  }
  this._update.password = bcrypt.hashSync(this._update.password, 8);
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

const userModel = mongoose.model('Users', userSchema);

module.exports = userModel;