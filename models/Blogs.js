const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogsSchema = new Schema({

    title: { type: String, maxLength: 256, required: true, },
    body: String,
    photo: String,
    tags: [String],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    }
});

const blogsModel = mongoose.model('Blogs', blogsSchema);
module.exports = blogsModel;