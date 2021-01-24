const blog = require('../models/Blogs');

const create = (blog) => blog.create(blog);
const getAll = (query) => blog.find(query).exec();
const getById = (id) => blog.findById(id).exec();
const getByTitle= ({title}) => blog.find(title).exec();
const getByTag = ({tag}) => blog.find({tag}).exec();
const getByAuthor= ({id}) => blog.find({id}).exec();
const editById = (id, body) => blog.findByIdAndUpdate(id, body, { new: true }).exec();
const deleteById = (id) => blog.findOneAndRemove(id, {new: true}).exec();

module.exports = { create, getAll, getById, getByTitle, getByTag, getByAuthor, editById, deleteById };