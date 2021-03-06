const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const asyncSign = promisify(jwt.sign);
const User = require('../models/Users');
const CustomError = require('../helpers/CustomError')

const register = (user) => User.create(user);
const login = async ({ username, password }) => {
    const user = await User.findOne({username});
    if (!user) {
        throw Error("UN_AUTHENTICATED");
    }
    const IsValidPass = user.validatePassword(password);
    if (!IsValidPass) {
        //throw Error("UN_AUTHENTICATED");
        throw (new CustomError(401, 'AUTHENTICATION_REQUIRED', 'User name or password is incorrect'));
    }
    const token = await asyncSign({ username: user.username, id: user.id },
         'SECRET_MUST_BE_COMPLEX', { expiresIn: '1d' });
      return { ...user.toJSON(), token };
      // match input password with user data using bcrypt
};
const getAll = () => User.find({}).exec();
const getById = (id) => User.findById(id).exec();
const PutOne = (id, newData) => User.findByIdAndUpdate(id, newData, {new: true}).exec();
const updateOne = (id, newData) => User.findByIdAndUpdate(id, newData, {new: true}).exec();
const deleteById = (id) => User.findOneAndDelete(id, {new: true}).exec();

module.exports = { register, login, getAll, getById, PutOne, updateOne, deleteById };