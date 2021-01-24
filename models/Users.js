const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const usersSchema = new Schema({

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

usersSchema.pre('save', function preSave(next) {
  this.password = bcrypt.hashSync(this.password, 8);
  next();
});

usersSchema.pre('findOneAndUpdate', function preSave(next) {
  if (!this._update.password) {
    return;
  }
  this._update.password = bcrypt.hashSync(this._update.password, 8);
  next();
});

usersSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

const UsersModel = mongoose.model('Users', usersSchema);
module.exports = UsersModel;