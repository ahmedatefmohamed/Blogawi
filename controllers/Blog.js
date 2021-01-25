const Blog = require('../models/Blogs');

const create = (blog) => Blog.create(blog);
const getAll = (query) => Blog.find(query).exec();
const getById = (id) => Blog.findById(id).exec();
const getByTitle= ({title}) => Blog.find(title).exec();
const getByTag = ({tag}) => Blog.find({tag}).exec();
const getByAuthor= ({id}) => Blog.find({id}).exec();
const editById = (id, body) => Blog.findByIdAndUpdate(id, body, { new: true }).exec();
const deleteById = (id) => Blog.findOneAndRemove(id, {new: true}).exec();

module.exports = { create, getAll, getById, getByTitle, getByTag, getByAuthor, editById, deleteById };